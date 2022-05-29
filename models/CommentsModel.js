var mongoose = require("mongoose");
  const Schema = mongoose.Schema;


var CommentsModel = new mongoose.Schema({
    JobId: {type:Schema.Types.ObjectId, ref: 'Jobs',required:true},
    UserID: {type:Schema.Types.ObjectId, ref: 'User',required:true},
    Content: {type:Schema.Types.String,required:true},
	status:{type:String,required:true,default:'Pending'},
}, {timestamps: true
}
 );


module.exports = mongoose.model("Comments", CommentsModel);