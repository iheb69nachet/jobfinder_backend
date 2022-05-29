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
const CategoryModel=require('../models/categoryModel')

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
exports.addCat=(req,res)=>{
    try {
        var cat = new CategoryModel(
            req.body
        );
        cat.save(function (err) {
            if (err) { 
                console.log(err.message);
                return apiResponse.ErrorResponse(res, err); }
            
            return apiResponse.successResponseWithData(res,"Category Added Successfully.", cat);
        });
    } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
        
    }
}
exports.getAllCat=(req,res)=>{
    try{
        CategoryModel.find().then(cat=>{
            return apiResponse.successResponseWithData(res,"Categories retrieved Successfully",cat)

        })
    }catch(error){
        return apiResponse.ErrorResponse(res,error.message)
    }
}
exports.deleteCat=(req,res)=>{
    try{
        CategoryModel.findByIdAndRemove(req.params.id).then(cat=>{
            return apiResponse.successResponseWithData(res,"Category deleted",cat)
        })
    }catch(error){
        return apiResponse.ErrorResponse(res,error.message)
    }
}
exports.updateCat=(req,res)=>{
    try {
        CategoryModel.findOne({_id:req.body.id}, function(err, cat) {
            console.log(cat);
            if(!err) {
                if(!cat) {
                    
                }
                cat.name = req.body.cat;
                cat.save(function(err) {
                    if(!err) {
                        return apiResponse.successResponseWithData(res,`Category is updated Successfully.`);
    
                    }
                    else {
                        console.log(err.message);
    
                    return apiResponse.ErrorResponse(res,err.message);
    
                    }
                });
            }
        });
    
    } catch (error) {
        return apiResponse.ErrorResponse(res,message.error)
    }
    // try{
    //     CategoryModel.findByIdAndUpdate(req.params.id).then(cat=>{
    //         return apiResponse.successResponseWithData(res,"Category Updated",cat)
    //     })
    // }catch(error){
    //     return apiResponse.ErrorResponse(res,message.error)
    // }
}
exports.getCatById=(req,res)=>{
    try{
        CategoryModel.findById(req.params.id).then(cat=>{
            return apiResponse.successResponseWithData(res,"Category",cat)
        })
    }catch(error){
        return apiResponse.ErrorResponse(res,error.message)
    }
}
