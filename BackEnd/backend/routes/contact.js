import express from 'express'
import { getContact, getContactId, postPesan } from '../controllers/Contact.js';



export const routerContact = express.Router();

routerContact.post('/contact', postPesan)
routerContact.get('/contact', getContact)
routerContact.get('/contact/:id',getContactId )


