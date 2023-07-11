import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

export const Frame = db.define('frame',{
    uuid : {
        type : DataTypes.STRING,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false,
        validate:{
            notEmpty : true
        }
    },
    nama:{
        type: DataTypes.STRING
    },
    ukuran:{
        type: DataTypes.STRING
    },
    harga:{
        type : DataTypes.INTEGER
    },
    stok:{
        type: DataTypes.INTEGER
    },
    deskripsi:{
        type : DataTypes.TEXT
    },
    image:{
        type : DataTypes.STRING
    },
    url:{
        type : DataTypes.STRING
    }
},{
    freezeTableName:true
});

// Table order
export const Order = db.define('orderFrame',{
    namaPembeli : {
        type : DataTypes.STRING
    },
    alamat : {
        type : DataTypes.STRING
    },
    harga : {
        type : DataTypes.INTEGER
    },
    jumlah : {
        type : DataTypes.INTEGER
    },
    total : {
        type : DataTypes.INTEGER
    },
    frameId:{
        type: DataTypes.INTEGER,
        allowNull : false,
        validate:{
            notEmpty:true
        }
    }
},{
    freezeTableName:true,
    timestamps : true
});

Frame.hasMany(Order)
Order.belongsTo(Frame, {
    foreignKey: 'frameId'
})

db.sync()
