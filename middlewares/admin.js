const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
var apiResponse = require("../helpers/apiResponse");

const CheckAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return apiResponse.ErrorResponse(res, err.message);
            }
            if(user.role=="admin"){
                req.user = user;
                next();
            }else{
                return apiResponse.unauthorizedResponse(res, "not allowed");

            }
        });
    } else {
        return apiResponse.unauthorizedResponse(res, "bad jwt");

    }
};
module.exports=CheckAdmin