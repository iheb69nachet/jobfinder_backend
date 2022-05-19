var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	firstName: {type: String, required: false},
	lastName: {type: String, required: false},
	username: {type: String, required: false},
	email: {type: String, required: true},
	password: {type: String, required: true},
	birthdate: {type: String, required: false},
	phone: {type: Number, required: true},
	adress: {type: String, required: false},
	diploma: {type: String, required: false},
	role:{type:String,required:true,default:'condidate'},
	status: {type: Boolean, required: true, default: 1},
	CompanyName: {type: String, required: false},
	CompanyAddress: {type: String, required: false},
	sector: {type: String, required: false},
	description: {type: String, required: false},
	creationDate: {type: String, required: false},
	type: {type:String,required:false},
}, {timestamps: true});

// Virtual for user's full name
UserSchema
	.virtual("fullName")
	.get(function () {
		return this.firstName + " " + this.lastName;
	});

module.exports = mongoose.model("User", UserSchema);