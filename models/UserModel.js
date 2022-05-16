var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	username: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	birthdate: {type: String, required: true},
	phone: {type: Number, required: true},
	adress: {type: String, required: true},
	diploma: {type: String, required: true},
	role:{type:String,required:true,default:'candidate'},
	status: {type: Boolean, required: true, default: 1}
}, {timestamps: true});

// Virtual for user's full name
UserSchema
	.virtual("fullName")
	.get(function () {
		return this.firstName + " " + this.lastName;
	});

module.exports = mongoose.model("User", UserSchema);