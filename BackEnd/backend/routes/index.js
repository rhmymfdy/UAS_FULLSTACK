import express from "express";
import { getPackage, getPackageId, postPackage } from "../controllers/Package.js";
import { getUsers, Register, login, logout, getUsersId } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import {verifyAdmin} from '../middleware/VeryfyAdmin.js'

const router = express.Router();

router.get('/users', verifyToken ,getUsers)
router.post('/users', Register)
router.post('/login', login )
router.delete('/logout', logout )
router.get('/users/:id', getUsersId)



router.get('/admin', verifyAdmin ,getUsers)







export default router; 

