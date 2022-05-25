var mongoose = require("mongoose");
  const Schema = mongoose.Schema;


var ApplyModel = new mongoose.Schema({
	user_id: {type:Schema.Types.ObjectId, ref: 'User',required:true},
	file_path: {type: String, required: true},
	motivation: {type: String, required: true},
	status:{type:String,required:true,default:'Pending'},

	job_id: {type:Schema.Types.ObjectId, ref: 'Jobs',required:true},
	
}, {timestamps: true
}
 );


  
module.exports = mongoose.model("apply_jobs", ApplyModel);