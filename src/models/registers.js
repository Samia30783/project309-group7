const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
 firstname: {
     type: String,
     required:true
 },
 lastname: {
     type: String,
     required:true
 },
 email: {
     type: String,
     required:true
 },
 password: {
     type: String,
     required:true
 },
 confirmpassword: {
     type: String,
     required:true
 }


})

const Register = new mongoose.model("Register", registrationSchema);

module.exports = Register;