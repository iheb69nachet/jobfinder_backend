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
const JobModel = require("../models/JobModel");

exports.GetCandidates=(req,res)=>{
    try {
        UserModel.find({role:"candidate"}).select(["_id", "firstName", "lastName", "username","email","phone","birthdate","diploma","adress"]).then(user => {
            return apiResponse.successResponseWithData(res,"candidates List", user);
    
        })
    } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
        
    }
  

}
exports.GetCompanies=(req,res)=>{
    try {
        UserModel.find({role:"company"}).select(["_id", "CompanyName", "CompanyAddress", "sector","description","creationDate","type","phone",'address',"email"]).then(user => {
            return apiResponse.successResponseWithData(res,"company List", user);
    
        })
    } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
        
    }
   
  

}
exports.GetJobs=(req,res)=>{
    try{
        JobModel.find().select(["_id","CompanyID","title","description","placesAvailable","qualifications","technologiesReq","diplomaReq","jobtypes","status"]).then(job=>{
            return apiResponse.successResponseWithData(res,"job offers list",job)

        })
    }catch(error){
        return apiResponse.ErrorResponse(res,error.message)
    }
}
