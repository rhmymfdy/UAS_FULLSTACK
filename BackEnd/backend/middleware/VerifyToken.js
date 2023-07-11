import Users from "../models/UserModel.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.cookies.refreshToken 

    if(!authHeader) return res.sendStatus(401);
    const user = await Users.findAll({
        where:{
            refresh_token: authHeader
        }
    })
    if (!user[0]) return res.sendStatus(403)
    next()
}

export const verifyAdmin = async (req, res, next) => {  
    const authHeader = req.cookies.refreshToken 

    if(!authHeader) return res.sendStatus(401);
    const user = await Users.findAll({
        where:{
            refresh_token: authHeader
        }
    })
    if (!user[0]) return res.sendStatus(403).json({msg : "User Tidak Valid"})

    if(user.name !== ['rhmy','tito','kones']) return res.status(403).json({msg: 'Bukan Admin'})
    next()
}