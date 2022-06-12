const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


const validate = (data)=>{
    const schema = joi.object({
        name: joi.string().required().label("Name"),
        email: joi.string().required().label("Email"),
        password: passwordComplexity().required().label("password")
    });
    return schema.validate(data);
}

module.exports = validate; 