const route = require("express").Router();
const joi  = require("joi");
const jwt = require("jsonwebtoken");
const transaction = require("../models/transaction");

route.post("/", async(req, res)=>{
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});
        console.log(req.body);
        const token = req.cookies.jwtLogin;
        const verifyUser = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const userTrans = await new transaction({...req.body, userId:verifyUser.id}).save();
        console.log(userTrans);
        res.status(201).send({data:getTrans , message: "Transaction Saved"});
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
})

const validate = (data)=>{
    const schema = joi.object({
        amount:joi.string().required().label("Amount"),
        transactionType: joi.string().required().label("Transaction"),
        partyName: joi.string().required().label("Party Name"),
    });
    return schema.validate(data);
}
module.exports = route;