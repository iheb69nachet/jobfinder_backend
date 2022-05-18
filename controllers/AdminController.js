const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");

exports.GetCandidates=(req,res)=>{
    try {
        UserModel.find({role:"candidate"}).select(["_id", "firstName", "lastName", "username","email","phone","birthdate","diploma","adress"]).then(user => {
            return apiResponse.successResponseWithData(res,"candidates List", user);
    
        })
    } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
        
    }
  

}
