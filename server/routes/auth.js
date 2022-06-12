const route = require("express").Router();
const joi  = require("joi");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const generateAuthToken = require("../middlewares/generateToken")

route.post("/", async(req, res)=>{
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});

        const getUser = await user.findOne({where:{email:req.body.email}});
        if(!getUser)
            return res.status(401).send({message:"Invalid Email or Password"});

        const validPass = await bcrypt.compare(req.body.password, getUser.password);
        if(!validPass)
            return res.status(401).send({message:"Invalid Email or Password"});
        
        const token = generateAuthToken(getUser);
        res.cookie("jwtLogin", token,{
            expires : new Date(Date.now()+ 24*60*60*1000),
            httpOnly : false
        });
        console.log("cookies stored");
        res.status(201).send({data:token , message: "Logged In Successfully"})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
})

const validate = (data)=>{
    const schema = joi.object({
        email:joi.string().required().label("Email"),
        password: joi.string().required().label("Password")
    });
    return schema.validate(data);
}
module.exports = route;