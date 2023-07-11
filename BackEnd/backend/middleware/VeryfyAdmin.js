import Users from "../models/UserModel.js";

export const verifyAdmin = async (req, res, next) => {
    const authHeader = req.cookies.refreshToken 

    if(!authHeader) return res.sendStatus(401);

    const user = await Users.findAll({
        where:[{
            refresh_token: authHeader
        },{
            status : 'Admin'
        }]
    })

    if (!user[0]) return res.sendStatus(403)
    next()
}