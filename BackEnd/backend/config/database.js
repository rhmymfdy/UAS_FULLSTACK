import { Sequelize } from "sequelize";

const db = new Sequelize('bapakhadiq', 'root', '',{
    host : "localhost",
    dialect : "mysql",

})



export default db;