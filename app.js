import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors"
import AuthenticationRoutes from "./src/Routes/Authentication.routes.js";

const PORT= 4000
const HOST= "localhost"
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(AuthenticationRoutes)

app.use((req,res)=>{
res.send("Not Found")
})

app.listen(PORT,HOST,()=>{
    console.log(`Server Running on http://${HOST}:${PORT}`);
})