const route = require("express").Router();
const joi  = require("joi");
const jwt = require("jsonwebtoken");
const transaction = require("../models/transaction");

route.get("/", async(req, res)=>{
    try {
        console.log("request Recieved")
        const token = req.cookies.jwtLogin;
        const verifyUser = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const userTrans = await transaction.findAll({where:{userId: verifyUser.id}});
        console.log(userTrans);
        res.status(201).send({data:userTrans , message: "Transaction Recieved"});
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
})

module.exports = route;