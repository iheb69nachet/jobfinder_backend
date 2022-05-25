var mongoose = require("mongoose");
  const Schema = mongoose.Schema;


var CategoryModel = new mongoose.Schema({
	name: {type:String,required:true},
	
	
}, {timestamps: true}
 );


  
module.exports = mongoose.model("Category", CategoryModel);