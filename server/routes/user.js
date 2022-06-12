const route = require("express").Router();
const validate = require("../middlewares/validate");
const user = require("../models/user");
const bcrypt = require("bcrypt");

route.post("/", async(req, res)=>{
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});

        const getUser = await user.findOne({where:{email:req.body.email}});
        if(getUser)
            return res.status(409).send({message:"User with given Email already exist."});
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPass = await bcrypt.hash(req.body.password, salt);

        await new user({...req.body, password: hashPass}).save();
        res.status(201).send({message: "User created Successfully"})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
})

module.exports = route;