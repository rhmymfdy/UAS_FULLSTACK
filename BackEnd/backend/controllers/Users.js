import Users from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { where } from "sequelize";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const getUsersId = async (req, res) => {
    try {
        const users = await Users.findOne({
            where : {
                id_user : req.params.id
            }
        })
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const Register = async(req, res)=>{
    const {name, email, country, password, confPassword} = req.body;
    if (password != confPassword) return res.status(400).json({msg: "password salah"})

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt)

    try {
        await Users.create({
            name : name,
            email : email,
            country : country,
            password : hash
        });
        res.json({msg : "Register Berhasil"})
        console.log(req.body)
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
      const user = await Users.findAll({
        where: {
          email: req.body.email
        }
      });
  
      const math = await bcrypt.compare(req.body.password, user[0].password);
      if (!math) return res.status(400).json({ msg: "Password Salah" });
  
      const name = user[0].name;
      const email = user[0].email;
  
      const refreshToken = jwt.sign({ name, email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
      });
  
      let link = '';
  
      if (email === 'romi@gmail.com' || email === 'tito@gmail.com' || email === 'arief@gmail.com') {
        link = '/admin';
      } else {
        link = '/home';
      }
  
      console.log(link);
  
      await Users.update({ refresh_token: refreshToken }, {
        where: {
          name: name
        }
      });
  
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });
  
      res.json({
        pesan: "berhasil login",
        link: link
      });
  
    } catch (error) {
      console.log(error);
      res.status(404).json({ msg: "Email Tidak Ditemukan" });
    }
  };
  
  

export const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        })
        if (!user[0]) return res.sendStatus(204)
        const name = user[0].name
        await Users.update({refresh_token: null},{
            where:{
                name:name
            }
        })
        res.clearCookie('refreshToken')
        return res.sendStatus(200)
}


  