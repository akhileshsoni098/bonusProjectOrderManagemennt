const customerModel =require('../models/custmerModel')


const customerCreation = async function(req,res){
try{
    const data = req.body

    let {name ,email,password} =data
// ===name =====
    if(!name){return res.status(400).send({status:false , message:"provide your name"})}
name = data.name = name.trim()

if(name != 'string' || name== ''){
    return res.status(400).send({status:false , message:"name field can not be empty"})
}
//=========email
if(!email){return res.status(400).send({status:false , message:"provide your email"})}
email = data.email = email.trim()

if(email != 'string' || email== ''){
    return res.status(400).send({status:false , message:"email field can not be empty"})
}
// regex============lagana h
const emailExist = await customerModel.findOne({email:email})
if(emailExist){return res.status({status:false , message:"email already exist"})}


// password 
if(!password){return res.status(400).send({status:false , message:"provide your password"})}
password = data.password = password.trim()

if(password != 'string' || password== ''){
    return res.status(400).send({status:false , message:"password field can not be empty"})
}

// regex for password ===================

const saveCustomer = await customerModel.create(data)

res.status(201).send({status:true , data:saveCustomer})

}catch(err){
    return res.status(500).send({status:false , message:err.message})
}
}

module.exports ={customerCreation}
