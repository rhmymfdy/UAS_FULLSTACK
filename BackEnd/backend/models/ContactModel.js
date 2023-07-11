import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const ContactUs = db.define('contact',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email:{
        type : DataTypes.STRING,
    },
    pesan:{
        type : DataTypes.TEXT
    }
},{
    freezeTableName:true
});

export default ContactUs;

// (async()=>{
//     await db.sync()
// })()