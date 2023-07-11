
import {Frame, Order} from "../models/models.js";
import path from 'path'

import fs from 'fs'

export const getFrame = async(req, res) =>{
    try {
        const resFrame = await Frame.findAll({
            attributes : ['uuid','nama','ukuran','harga','stok','deskripsi','image','url','id'],
        })
        res.status(200).json(resFrame)
    } catch (error) {
        res.status(500).json({msg : error.message})
        console.log(error.message)        
    }
}

export const getFrameById = async(req, res) =>{
    try {
        const resFrame = await Frame.findOne({
            attributes : ['uuid','nama','ukuran','harga','stok','deskripsi','image','url'],
            where:{
                uuid : req.params.id
            }
        })
        res.json(resFrame)
    } catch (error) {
        console.log(error.message)        
    }
}

export const postFrame = (req, res) =>{
    if (req.files === null) return res.status(400).json({msg : 'File Tidak Di Upload'})

    const nama = req.body.nama
    const ukuran = req.body.ukuran
    const harga = req.body.harga
    const stok = req.body.stok
    const deskripsi = req.body.deskripsi

    // upload Gambar
    const image = req.files.image
    const imageSize = image.data.length
    const extension = path.extname(image.name)
    const imageName = image.md5 + extension
    const url = `${req.protocol}://${req.get('host')}/images/${imageName}`
    console.log(imageName)

    const allowTypes = ['.png', '.jpg', '.jpeg']

    if (!allowTypes.includes(extension.toLowerCase())) return res.status(422).json({msg: 'File Tidak Valid'})
    if (imageSize > 10000000) return res.status(422).json({msg: 'Gambar Terlalu Besar'})

    image.mv(`./public/images/${imageName}`, async(err) =>{
        if (err) return res.status(500).json({msg : err.message})
        try {
            await Frame.create({
                nama : nama,
                ukuran : ukuran,
                harga : harga,
                stok : stok,
                deskripsi : deskripsi,
                image : imageName,
                url : url
            })
            res.status(201).json({msg: "Frame Berhasil di Tambah"})
        } catch (error) {
            console.log(error.message)     
        }
    })
    
}

export const updateFrame = async(req, res) =>{
    const resFrame = await Frame.findOne({
        where:{
            uuid : req.params.id
        }
    })
    console.log(resFrame)

    if (!resFrame) return res.status(404).json({msg: 'Tidak ada Frame Terdaftar'})

    let imageName = ''

    if(req.files.image === null){
        imageName = resFrame.image
    } else {
        const image = req.files.image
        const imageSize = image.data.length
        const extension = path.extname(image.name)
        const imageName = image.md5 + extension
        const allowTypes = ['.png', '.jpg', '.jpeg']

        if (!allowTypes.includes(extension.toLowerCase())) return res.status(422).json({msg: 'File Tidak Valid'})
        if (imageSize > 10000000) return res.status(422).json({msg: 'Gambar Terlalu Besar'})

        // Delete Image From Path / unlink
        const filePath = `./public/images/${resFrame.image}`
        fs.unlinkSync(filePath)

        image.mv(`./public/images/${imageName}`,(err) =>{
            if (err) return res.status(500).json({msg : err.message})
        })
    }
    
    const nama = req.body.nama
    const ukuran = req.body.ukuran
    const harga = req.body.harga
    const stok = req.body.stok
    const deskripsi = req.body.deskripsi
    const url = `${req.protocol}://${req.get('host')}/images/${imageName}`

    try {
        await Frame.update({
            nama : nama,
            ukuran : ukuran,
            harga : harga,
            stok : stok,
            deskripsi : deskripsi,
            image : imageName,
            url : url
        },{
            where : {
                id : resFrame.id
            }
        })
        res.status(200).json({msg: 'Berhasil Di Update'})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteFrame = async(req, res) =>{
    const resFrame = await Frame.findOne({
        where:{
            uuid : req.params.uuid
        }
    })
    console.log(resFrame)
    if (!resFrame) return res.status(404).json({msg: 'Tidak ada Frame Terdaftar'})
    try {
        // Delete Image From Path / unlink
        const filePath = `./public/images/${resFrame.image}`
        fs.unlinkSync(filePath)
        // Delete database
        await resFrame.destroy({
            where : {
                uuid : resFrame.uuid
            }
        })
        res.status(200).json({msg: 'Berhasil Menghapus'})
    } catch (error) {
        console.log(error.message)
    }
}

// connect one to Many

export const getFrameOrder = async (req,res) =>{
    const data = await Frame.findAll({
        include: [{
            model : Order
        }]
    })
    console.log(data[0])
    res.json(data)
    
}

export const getFrameOrderById = async (req,res) =>{
    const uuid = req.params.uuid
    const data = await Frame.findAll({
        include: [{
            model : Order
        }],
        where:{
            uuid:uuid
        }
    })
    res.json(data[0].orderFrames[0])
    
}

// export const postOrder = async (req,res) => {
//     const id_frame = req.params.id_frame
//     try {
//         const dataOrder = await Frame.findOne({
//             include: [{
//                 model : Order
//             }],
//             where:{
//                 id_frame:id_frame
//             }
//         })
//         await Order.create({
//             id_order : id_order,
//             id_frame : id_frame
//         });
//         res.json({msg : "Order Berhasil ditambah"})
        
//     } catch (error) {
//         console.log(error)
//     }
// }