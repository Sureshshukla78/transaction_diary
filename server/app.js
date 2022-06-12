require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

const sequelize = require("./database/connection");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const transRoutes = require("./routes/transaction");
const getTransRoutes  = require("./routes/gettransaction");

sequelize.sync().then(()=>{
    console.log("DB is Ready");
});

app.use(express.json());
app.use(cors({credentials:true,origin:true}));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transaction", transRoutes);
app.use("/api/mytransaction", getTransRoutes);
app.get('/', async (req, res)=>{
    res.send("Hello World!");
});


app.listen(port, ()=>{
    console.log("Backend Server is Running at port localhost:8080");
})