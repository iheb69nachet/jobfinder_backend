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
var ObjectId = require('mongodb').ObjectID;
exports.AddNew=(req,res)=>{
    console.log(req.body);
    req.body.CompanyID=req.user._id
    try {
        var job = new JobModel(
            req.body
        );
        job.save(function (err) {
            if (err) { 
                console.log(err.message);
                return apiResponse.ErrorResponse(res, err); }
            
            return apiResponse.successResponseWithData(res,"Job Added Successfully.", job);
        });
    } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
        
    }
  

}
exports.GetJobs=(req,res)=>{
    let id=req.query.id||""
    try {
        if(id!==''){
            try {
                JobModel.findOne({_id:new ObjectId(id),CompanyID:req.user._id}).populate('CompanyID',["_id", "CompanyName", "CompanyAddress", "sector","description","creationDate","type","diploma","phone",'address',"email"]).then(job=>{
                    if(!job){
                    return apiResponse.successResponseWithData(res,"no job found", job);

                    }
                    return apiResponse.successResponseWithData(res,"Job retrieved Successfully.", job);
                })
            } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
                
            }
          
        }else{
            try {
                JobModel.find({CompanyID:req.user._id}).populate('CompanyID',["_id", "CompanyName", "CompanyAddress", "sector","description","creationDate","type","diploma","phone",'address',"email"]).then(job=>{
                
                    return apiResponse.successResponseWithData(res,"Jobs retrieved Successfully.", job);
                })
            } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
                
            }
            
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
        
    }
    
}
exports.ApproveJob=(req,res)=>{
    try {
        JobModel.findOneAndUpdate({_id:new ObjectId(req.query.id)},{status:"Approved"},function(err, doc) {
            if (err) return apiResponse.ErrorResponse(res,error.message);
            return apiResponse.successResponse(res,"Jobs Approved");
            
        });}
        catch(error){
        return apiResponse.ErrorResponse(res,error.message);

        }
}
exports.Approved=(req,res)=>{
    try {
        JobModel.find({status:"Approved"}).populate('CompanyID').then(jobs=>{
            return apiResponse.successResponseWithData(res,"jobs", jobs);

        })
    }
        catch(error){
        return apiResponse.ErrorResponse(res,error.message);

        }
}
