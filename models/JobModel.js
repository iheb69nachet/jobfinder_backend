var mongoose = require("mongoose");
  const Schema = mongoose.Schema;


var JobSchema = new mongoose.Schema({
	title: {type: String, required: false},
	description: {type: String, required: false},
	placesAvailable: {type: Number, required: false},
	qualifications: {type: String, required: true},
	technologiesReq: {type: String, required: true},
	diplomaReq: {type: String, required: false},
	jobtypes: {type: String, required: true},
	localisation:{type:String,required:true},
	status:{type:String,required:true,default:'Pending'},
	CompanyID: {type:Schema.Types.ObjectId, ref: 'User',required:true},
    created_at:{type:Date, default:Date.now()}
}, {timestamps: true
}
 );

JobSchema.virtual('CompanyInfo', {
    ref: 'User',
    localField: '_id',
    foreignField: 'CompanyID',
  });
  mongoose.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Jobs", JobSchema);