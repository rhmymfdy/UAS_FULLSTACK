import express from 'express'

import { getFrame,
        getFrameById,
        postFrame,
        updateFrame,
        deleteFrame,getFrameOrder, getFrameOrderById} from "../controllers/ShopCtrl.js";

import {verifyAdmin, verifyToken} from '../middleware/VerifyToken.js'
const ShopRoute = express.Router()

ShopRoute.get('/frame',getFrame)
ShopRoute.get('/frame/:id',getFrameById)
ShopRoute.post('/frame',postFrame )
// ShopRoute.patch('/frame/:id',updateFrame)
ShopRoute.delete('/frame/:uuid',deleteFrame)

ShopRoute.get('/frameorder', getFrameOrder)
ShopRoute.get('/frameorder/:id', getFrameOrderById)

export default ShopRoute; 

