const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},


category:{
    type:String,
    default:"regular"
},
orderCount:{
    type:Number,
    default:0
},



}, {timestamp:true})

module.exports =mongoose.model('customer', customerSchema)
