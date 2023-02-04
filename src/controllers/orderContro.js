

const { isValidObjectId } = require("mongoose")
const orderModel = require("../models/orderModel")
const customerModel = require("../models/custmerModel")

const orderCreation = async function(req , res){

let orderData = req.body
let {customerId , amount } = orderData 

if(!customerId){return res.status(400).send({status:false , message:"please provide customer id"})}
if(!isValidObjectId (customerId)){return res.status(400).send({status:false , message:"please provide valid customer id"})}

let customerDetails = await customerModel.findById(customerId)
// ● Gold = 10% discount, platinum = 20% discount 
let discount =0
console.log(typeof (customerDetails.category) ,"  category type")
console.log(customerDetails.category, "   category")
if(customerDetails.category =="gold"){
    discount =amount*0.1 
    amount = amount-discount

console.log(discount)
console.log(amount)


    await orderModel.findOneAndUpdate({customerId:customerId},{$set:{amount:amount, discount:discount}},{new:true})

} 
else if(customerDetails.category =="platinum"){
    discount = amount*0.2
    amount = amount-discount

await orderModel.findOneAndUpdate({customerId:customerId},{$set:{amount:amount, discount:discount}},{new:true})

}

// ○ Customer is promoted to gold when he has placed 10 orders
// ○ Customer is promoted to platinum when he has placed 20 orders



if(customerDetails.orderCount===10){
    customerDetails.category = "gold"
    await customerModel.findOneAndUpdate({_id:customerId},{$set:{category: customerDetails.category}},{new:true})
}
if(customerDetails.orderCount===20){
  customerDetails.category ="platinum"

  await customerModel.findOneAndUpdate({_id:customerId},{$set:{category: customerDetails.category}},{new:true})

}

console.log(customerDetails.category)

await  customerModel.findOneAndUpdate({_id:customerId},{$inc:{orderCount:+1}},{new:true})
    // {$or:[{orderCount:{$eq:10,$set:{category:customerDetails.category}}},{orderCount:{$eq:20,$set:{category:customerDetails.category}}}]})

const orderDetails = {customerId:customerId,amount,discount }

let savedOrder = await orderModel.create(orderDetails)

return res.status(201).send({status:true, data:savedOrder})
 
}
 
const getOrder = async function (req, res){

    const customerId = req.params.customerId

const allOrders = await orderModel.find({customerId:customerId}).sort({amount: 1})
if(allOrders.length==0){
  return res.status(404).send({status:false , message:"no order found"})
}

res.status(200).send({status:false , data:allOrders})
}



module.exports = {orderCreation,getOrder }