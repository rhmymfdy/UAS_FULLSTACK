import express from 'express'
import { getOrder,getOrderById,postOrder } from '../controllers/orderCtrl.js'

const OrderRouter = express.Router()

OrderRouter.get('/order',getOrder)
OrderRouter.get('/order/:id',getOrderById)
OrderRouter.post('/order',postOrder)

export default OrderRouter