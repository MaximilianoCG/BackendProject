const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./Routes/user')
const authRoute = require('./Routes/auth')
const productRoute = require('./Routes/producto')
const cartRoute = require('./Routes/Cart')
const orderRoute = require('./Routes/Order')

dotenv.config();

//Conectar server a MONGODB
mongoose
.connect(process.env.MONGO_URL)
.then(() =>console.log("DBConeccion exitosa!"))
.catch((err)=>{console.log(err)});

//Rutas
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

//Server
app.listen(process.env.PORT || 8080, ()=>{
    console.log("El server esta arriba")
});