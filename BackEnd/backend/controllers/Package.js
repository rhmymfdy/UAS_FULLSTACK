import Package from "../models/PackageModel.js";
import path from 'path'
import fs from 'fs'

export const getPackage = async (req, res) => {
    try {
        const response = await Package.findAll()
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

export const getPackageId = async (req, res) => {
    try {
        const response = await Package.findOne({
            where : {
                id : req.params.id
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

export const getPackageByCategory = async (req, res) => {
    try {
        const response = await Package.findAll({
            where : {
                category : req.params.category
            }
        })
        console.log(response)
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

export const postPackage = async (req, res)=>{
    if (req.files === null) return res.status(400).json({msg : 'File Tidak Di Upload'})

    const id = req.body.id
    const category = req.body.category
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price

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
            await Package.create({
                id : id,
                category : category,
                title : title,
                description : description,
                price : price,
                image : imageName,
                url : url
            })
            res.status(201).json({msg: "Package berhasil ditambahkan"})
        } catch (error) {
            console.log(error.message)     
        }
    })
}

export const deletePackage = async(req, res) =>{
    console.log(req.params.id)
    const response = await Package.findOne({
        where:{
            id : parseInt(req.params.id)
        }
    })

    console.log(response)

    if (!response) return res.status(404).json({msg: 'Tidak ada Package yang Terdaftar'})
    
    try {
        // Delete Image From Path / unlink
        const filePath = `./public/images/${response.image}`
        fs.unlinkSync(filePath)
        // Delete database
        await response.destroy({
            where : {
                id : parseInt(response.id)
            }
        })
        res.status(200).json({msg: 'Berhasil Menghapus'})
    } catch (error) {
        console.log(error)
    }
}
