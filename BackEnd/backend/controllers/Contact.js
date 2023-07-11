
import ContactUs from "../models/ContactModel.js";

export const postPesan = async (req, res) => {
    const {email, pesan} = req.body;

    try {
        const response = await ContactUs.create({
            email : email, 
            pesan : pesan
        })
        console.log(response)
        res.json({msg : "pesan telah terkirim"})
    } catch (error) {
        console.log(error)
    }
}

export const getContact = async (req, res) => {
    try {
        const response = await ContactUs.findAll()
        res.json(response)
        
    } catch (error) {
        console.log(error)
    }
}


export const getContactId = async (req, res) => {
    try {
        const response = await ContactUs.findOne({
            where : {
                id : req.params.id
            }

        })
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}