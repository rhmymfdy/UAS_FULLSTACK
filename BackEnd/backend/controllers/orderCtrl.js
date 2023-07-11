import {Frame, Order} from '../models/models.js'

export const getOrder = async (req, res) => {
    try {
        // const resOrder = await Frame.findAll()
        // res.json(resOrder)

        const resOrder = await Frame.findAll({
            include:[{
                model : Order
            }]
        })
        res.json(resOrder)
        
    } catch (error) {
        console.log(error.message)        
    }
}

export const getOrderById = async (req, res) => {
    try {
        const id = req.params.id
        const resOrder = await Frame.findOne({
            include : [{
                model : Order
            }],
            where:{
                id : id
            }
        })
        res.json(resOrder)
    } catch (error) {
        console.log(error.message)        
    }
}

export const postOrder = async (req,res) => {
    const {namaPembeli, alamat,frameId,harga,jumlah,total} = req.body
    try {
        await Order.create({
            frameId : frameId,
            namaPembeli : namaPembeli,
            alamat : alamat,
            harga : harga,
            jumlah : jumlah,
            total : total
            
        });
        console.log(total,"ini total")
        res.json({msg : "Order Berhasil ditambah"})
    } catch (error) {
        console.log(error)
    }
}
