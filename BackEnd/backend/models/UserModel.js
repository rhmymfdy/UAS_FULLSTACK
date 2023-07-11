import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    id_user:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name:{
        type: DataTypes.STRING,
        unique : true
    },
    email:{
        type: DataTypes.STRING,
        unique : true
    },
    password:{
        type : DataTypes.STRING
    },
    country:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type : DataTypes.TEXT
    }
},{
    freezeTableName:true
});


export default Users;

// (async()=>{
//     await db.sync()
// })()