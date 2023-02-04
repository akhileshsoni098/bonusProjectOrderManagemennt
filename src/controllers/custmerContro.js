const customerModel =require('../models/custmerModel')


const customerCreation = async function(req,res){
try{
    const data = req.body

    let {name ,email,password} =data
// ===name =====
    if(!name){return res.status(400).send({status:false , message:"provide your name"})}

    if(typeof (name) != "string"){
        return res.status(400).send({status:false , message:"name field should be in string"})
    }
name = data.name = name.trim()

//=========email
if(!email){return res.status(400).send({status:false , message:"provide your email"})}


if(typeof(email) != 'string' || email== ''){
    return res.status(400).send({status:false , message:"email field can not be empty"})
}
email = data.email = email.trim()
// regex============remains
const emailExist = await customerModel.findOne({email:email})
if(emailExist){return res.status({status:false , message:"email already exist"})}


// password 
if(!password){return res.status(400).send({status:false , message:"provide your password"})}


if(typeof (password) != 'string' || password== ''){
    return res.status(400).send({status:false , message:"password field can not be empty"})
}
password = data.password = password.trim()
// regex for password ===================

const saveCustomer = await customerModel.create(data)

res.status(201).send({status:true , data:saveCustomer})

} catch(err){
    return res.status(500).send({status:false , message:err.message})
}
}


const getCustomer = async function(req, res){
    const customerId = req.params.customerId

    if(!customerId){return res.status(400).send({status:false , message:"please provide customer id"})}

// if(!mongoose.isValidObjectId (customerId)){return res.status(400).send({status:false , message:"please provide valid customer id"})}
console.log(customerId);
const customerData = await customerModel.findById(customerId)
res.status(200).send({status:false , message:customerData})


}

 

module.exports ={customerCreation,getCustomer}
