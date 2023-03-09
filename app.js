import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors"
import AuthenticationRoutes from "./src/Routes/Authentication.routes.js";
import mongodb from "./src/Services/Monogodb.services.js";
import { config } from "dotenv";
import UserRoute from "./src/Routes/User.routes.js";
import { ObjectId } from "mongodb";
import path from 'path'
import AdminRoutes from "./src/Routes/Admin.routes.js";
import ProductRoute from "./src/Routes/Product.routes.js";

config()
const PORT= 4000
const HOST= "localhost"
const CLUSTER_URL="localhost:27017"
// const USERNAME=encodeURIComponent('santhosh')
// const PASSWORD=encodeURIComponent("Aspire@123") 
// const AUTH_MECHANISAM="DEFAULT"
// const DB_NAME="project"

console.log('connecting');
// const status=await mongodb.connect(`mongodb://${USERNAME}:${PASSWORD}@${CLUSTER_URL}/?authMechanism=${AUTH_MECHANISAM}&authSource=${DB_NAME}`)
const status=await mongodb.connect(`mongodb://${CLUSTER_URL}`)
!status && process.exit(-1)
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(AuthenticationRoutes)
app.use(UserRoute)
app.use(AdminRoutes) 
app.use('/product',ProductRoute)
app.use('/assets/images',express.static('./ProductImages'))
app.use((req,res)=>{
    console.log(new ObjectId().toHexString());
    console.log(path.resolve());
    res.statusCode=404
res.send("Not Found")
})

app.listen(PORT,HOST,()=>{
    console.log(`Server Running on http://${HOST}:${PORT}`);
})
