import nodemon from "nodemon";

nodemon({script:'app.js'}).on("watching",(a)=>{
    console.log(a);
})
