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
const formData = require('express-form-data');
const ApplyModel = require("../models/ApplyModel");
const CommentsModel = require("../models/CommentsModel");

const { application, response } = require("express");
const FavoritesModel = require("../models/FavoritesModel");

var ObjectId = require('mongodb').ObjectID;
exports.AddNew=(req,res)=>{
    console.log(req.body);
    req.body.CompanyID=req.user._id
    req.body.category=req.category._id
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
                JobModel.findOne({_id:new ObjectId(id),CompanyID:req.user._id}).populate('CompanyID',["_id", "CompanyName", "CompanyAddress", "sector","description","creationDate","type","diploma","phone",'address',"email","localisation", "created_at"]).then(job=>{
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
                JobModel.find({CompanyID:req.user._id}).populate('CompanyID',["_id", "CompanyName", "CompanyAddress", "sector","description","creationDate","type","diploma","phone",'address',"email","localisation","created_at"]).then(job=>{
                
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
exports.DisapproveJob=(req,res)=>{
    try {
        JobModel.findOneAndUpdate({_id:new ObjectId(req.query.id)},{status:"Disapproved"},function(err, doc) {
            if (err) return apiResponse.ErrorResponse(res,error.message);
            return apiResponse.successResponse(res,"Jobs Disapproved");
            
        });}
        catch(error){
        return apiResponse.ErrorResponse(res,error.message);

        }
}
exports.Approved=(req,res)=>{
    try {
        JobModel.find({status:"Approved"}).populate('CompanyID',["_id", "CompanyName", "CompanyAddress", "sector","description","creationDate","type","diploma","phone",'address',"email","localisation","created_at"]).then(jobs=>{
            return apiResponse.successResponseWithData(res,"jobs", jobs);

        })
    }
        catch(error){
        return apiResponse.ErrorResponse(res,error.message);

        }
}
exports.getJobById=(req,res)=>{
    try{
        JobModel.findById(req.query.id).populate('CompanyID',["_id", "CompanyName", "CompanyAddress", "sector","description","creationDate","type","website","phone",'address',"email"]).
        then(async jobs=>{
            var data=jobs
            await CommentsModel.find({JobId:jobs._id,status:"Approved"}).populate('UserID').then(comments=>{
                var data={
                    job:jobs,
                    comments:comments
                }
                return apiResponse.successResponseWithData(res,"jobs",data)

            })
        
        })

    }catch(error){
        return apiResponse.ErrorResponse(res,error.message)
    }
}
exports.update=(req,res)=>{
    try{
        JobModel.findByIdAndUpdate(req.params.id).then(jobs=>{
            return apiResponse.successResponseWithData(res,"jobs",jobs)
        })

    }catch(error){
        return apiResponse.ErrorResponse(res,error.message)
    }

}
exports.delete=(req,res)=>{
    try{
        JobModel.findByIdAndDelete(req.params.id).then(jobs=>{
            return apiResponse.successResponseWithData(res,"jobs",jobs)
        })

    }catch(error){
        return apiResponse.ErrorResponse(res,error.message)
    }
     
}
exports.Apply=(req,res)=>{
    try {
        const apply=new ApplyModel({
            user_id:req.user._id,
            file_path:req.file.filename,
            job_id:req.body.job_id,
            motivation:req.body.motivation
        })
        apply.save(function (err) {
            if (err) { 
                console.log(err.message)
                return apiResponse.ErrorResponse(res, err); }
            
            return apiResponse.successResponseWithData(res,"Applied Successfully.");
        });
    } catch (error) {
        
    }
    console.log(req.user)    
    console.log(req.body);
    console.log(req.file.filename);
}
exports.GetApplies=(req,res)=>{
    ApplyModel.find({job_id:req.query.id}).populate('user_id').then(job=>{
        return apiResponse.successResponseWithData(res,"jobs",job)

    })
}
exports.comment=(req,res)=>{
    let comment=new CommentsModel({
        Content:req.body.comment,
        UserID:req.user._id,
        JobId:req.body.job_id,
        status:req.user.role=="company"?"Approved":"Pending"

    })
    console.log(comment);
    try {
        comment.save().then(result=>{
            return apiResponse.successResponseWithData(res,"Commented Successfully");
        
        })
    } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);

        
    }
    console.log(req.user)
}
exports.GetComments=(req,res)=>{
    CommentsModel.find({JobId:req.query.id}).then(comments=>{
        return apiResponse.successResponseWithData(res,'Comments',comments)
    })
}
exports.ApproveApp=(req,res)=>{
    try {
        ApplyModel.findOneAndUpdate({_id:new ObjectId(req.query.id)},{status:"Approved"},function(err, doc) {
            if (err) return apiResponse.ErrorResponse(res,error.message);
            return apiResponse.successResponse(res,"Application Approved");
            
        });}
        catch(error){
        return apiResponse.ErrorResponse(res,error.message);

        }
}
exports.DisapproveApp=(req,res)=>{
    try {
      ApplyModel.findOneAndUpdate({_id:new ObjectId(req.query.id)},{status:"Disapproved"},function(err, doc) {
            if (err) return apiResponse.ErrorResponse(res,error.message);
            return apiResponse.successResponse(res,"Application Disapproved");
            
        });}
        catch(error){
        return apiResponse.ErrorResponse(res,error.message);

        }
}
exports.GetApps=(req,res)=>{
    let id=req.query.id||""
    try {
        if(id!==''){
            try {
                ApplyModel.findOne({_id:new ObjectId(id),job_id:req.user._id}).populate('job_id','user_id',["_id", "motivation", "file_path"]).then(application=>{
                    if(!application){
                    return apiResponse.successResponseWithData(res,"no application found", application);

                    }
                    return apiResponse.successResponseWithData(res,"Application retrieved Successfully.", application);
                })
            } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
                
            }
          
        }else{
            try {
                ApplyModel.find({user_id:req.user._id}).populate('job_id','user_id'["_id", "motivation", "file_path"]).then(job=>{
                
                    return apiResponse.successResponseWithData(res,"applications retrieved Successfully.", application);
                })
            } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
                
            }
            
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res,error.message);
        
    }
    
}
exports.Actioncomment=async (req,res)=>{

    try {
        CommentsModel.findOne({_id:req.body.id}, function(err, comment) {
            if(!err) {
                if(!comment) {
                    
                }
                comment.status = req.body.status;
                comment.save(function(err) {
                    if(!err) {
                        return apiResponse.successResponseWithData(res,`Comment is ${req.body.status} Successfully.`);

                    }
                    else {
                        console.log(err.message);

                    return apiResponse.ErrorResponse(res,err.message);

                    }
                });
            }
        });
        
    } catch (error) {
        console.log(error.message);

        return apiResponse.ErrorResponse(res,error.message);
        
    }

}
exports.DeleteComment=async(req,res)=>{
    CommentsModel.findByIdAndRemove(req.query.id, function(err){
        if(err){
            return apiResponse.ErrorResponse(res,err.message);

        } else {
            return apiResponse.successResponseWithData(res,`Comment is deleted Successfully.`);

        }
     });
}
exports.favorites=async(req,res)=>{
    console.log(req.user);
    let data=new FavoritesModel({
        "JobId":req.body.id,
        "UserID":req.user._id
    })
    data.save()
    return apiResponse.successResponseWithData(res,'favorites added to favorites')
}
exports.Getfavorites=async(req,res)=>{
    FavoritesModel.find({"UserID":req.user._id}).then(favs=>{
        let array=[];
        favs.map(fav=>{
            array.push(fav.JobId)
        })
        return apiResponse.successResponseWithData(res,"favorites",array);
 
    })
}
exports.Deletefavorites=async(req,res)=>{
    try{
        FavoritesModel.findOneAndRemove({JobId:req.body.id,UserID:req.user._id}).then(cat=>{
            return apiResponse.successResponseWithData(res,"favorites deleted",cat)
        })
    }catch(error){
        return apiResponse.ErrorResponse(res,error.message)
    }
}