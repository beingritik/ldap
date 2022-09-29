
const mongoose =require('mongoose');

var userSchema = mongoose.Schema({
    userName:{type:String, required:true},
    userGroup:{type:String, default:null}
},
{versionKey: 'versionKey' })

const datab =  new mongoose.model("user",userSchema);
module.exports= datab;