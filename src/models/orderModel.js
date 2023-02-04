const mongoose =require('mongoose')
const objectId = mongoose.Schema.Types.objectId
const orderSchema = new mongoose.Schema({

customer:{
type:objectId,
ref:'customer',
required:true
},
amount:{
    type:Number,
    required:true
},
discount:{
    type:Nummber,
    default:0
},

},{timestamp:true})


module.exports =mongoose.model('order', orderSchema)