import express from "express"
import db from "./config/database.js"
import router from "./routes/index.js"
import routerPackage from "./routes/package.js";
import { routerContact } from "./routes/contact.js";
import dotenv from "dotenv";
import SequelizeStore from 'connect-session-sequelize'
import cors from "cors"
import session from 'express-session'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import ShopRoute from "./routes/ShopRoute.js";
import OrderRouter from './routes/orderRoute.js'

dotenv.config()
const app = express()
const port = 5000;

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db:db
}) 


// (async()=>{
//     await db.
// })()

try {
    await db.authenticate();
    console.log('Database Connected')
    
} catch (error) {
    console.log(error)
}

app.use(session({
    secret : process.env.SESS_SECRET,
    resave : false,
    saveUninitialized : true,
    store : store,
    cookie : {
        secure : 'auto'
    }
}))

app.use(cors({
    credentials:true, 
    origin:'http://localhost:5173'
}))

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload())
app.use(express.static('public'))

// Routes
app.use(router);

app.use(routerPackage)

app.use(routerContact)

app.use(ShopRoute)
app.use(OrderRouter)


store.sync();

app.listen(port,()=>{
    console.log(`Server Berjalan Pada Port ${port}`)
})
