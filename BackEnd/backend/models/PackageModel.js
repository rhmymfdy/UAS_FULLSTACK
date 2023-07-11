import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Package = db.define('package',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    category:{
        type : DataTypes.STRING
    },
    image:{
        type : DataTypes.STRING
    },
    
    title:{
        type : DataTypes.STRING
    },
    
    description:{
        type : DataTypes.STRING
    },
    
    price:{
        type : DataTypes.INTEGER
    },
    url:{
        type : DataTypes.STRING
    }
},{
    freezeTableName:true
});




export default Package;

// (async()=>{
//     await db.sync()
// })()