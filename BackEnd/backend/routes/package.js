import express from "express";
import { deletePackage, getPackage, getPackageByCategory, getPackageId, postPackage } from "../controllers/Package.js";


const routerPackage = express.Router();



routerPackage.get('/package', getPackage)
routerPackage.get('/package/:id', getPackageId)
routerPackage.get('/package/category/:category', getPackageByCategory)
routerPackage.post('/package', postPackage)
routerPackage.delete('/package/:id',deletePackage)





export default routerPackage; 

