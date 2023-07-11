import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

export const Sewa = db.define('sewa', {
  id_sewa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING
  },
  no_tlp: {
    type: DataTypes.STRING
  },
  tanggal: {
    type: DataTypes.STRING
  },
  jam: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
});

// (async()=>{
//   await db.sync()
// })()
