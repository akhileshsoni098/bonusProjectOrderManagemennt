const mongoose =require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const orderSchema = new mongoose.Schema({

customerId:{
type:objectId,
ref:'customer',
required:true
},
amount:{
    type:Number,
    required:true
},
discount:{
    type:Number,
    default:0
},

},{timestamp:true})


module.exports = mongoose.model('order', orderSchema)