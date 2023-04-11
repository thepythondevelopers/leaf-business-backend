const User = require('../models/User')

exports.signup = async (req, res)=>{

    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch (error){
        if ( error.code === 11000) {
            return  res.status(400).send({status : 400 , message : "Email Already exists"});
        }
          const errors = handleErrors(error)
          res.status(400).send({status : 401 ,message : errors.message})
    }
}

exports.login =  async (req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send({message : "User logged in"})
    }catch(e){
        if (e.message == 401) {
            return  res.status(400).send({status : 401 , message : "Invalid credentials"});
        }
        res.status(400).send({status : 404 , message : "User not found"});
          
    }
}

const handleErrors = (err) => {    
    const errors = {email:''};
    Object.values(err.errors).forEach(errEle => {
         errProperties = errEle.properties;
         errors["message"] = errProperties.message;
    });
    return errors;
}
