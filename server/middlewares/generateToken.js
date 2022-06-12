const jwt = require("jsonwebtoken");

const generateAuthToken = function(user){
    const token = jwt.sign({id:user.id},process.env.JWTPRIVATEKEY, {expiresIn:"7d"});
    return token;
}

module.exports = generateAuthToken;