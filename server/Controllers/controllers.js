import Profile from '../Schema/schema.js'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import path from 'path'

export const insertData = async(req,res) => {
    const {username,email,password,phonenumber} = req.body
    // Encnrypt Password
    
    // Checking if there is a registeration by the email
    try{
      var checkExistance = await Profile.findOne({email})
    }catch(error){
        res.status(500).json({msg:error})
    }
   
    if(checkExistance == null){
        // Store data on database
        
          try{
            const insertedData = await Profile.create({username,email,password,phonenumber})
            res.status(200).json({value:insertedData,msg:"Registered Successfully"})
          }catch(error){
            res.status(500).json({msg:error})
          }
    }else{
        res.json({value:null,msg:"There is a registeration by this email"})
    }
}

// Sign in controller

export const signIn = async(req,res) => {
     const {email,password} = req.body;
     
    //  Checking if there is a registeration by this email
    try{
       var checkEmail = await Profile.findOne({email});

       if(checkEmail !== null){
         
        // Compare or Decrypte password if it is match
        const isMatch = await bcrypt.compare(password,checkEmail.password);

        if(isMatch){
          
          // JWT (Json web tokens)
          const {id,username} = checkEmail;
          const JWT_SECRET = "jwtsecret";
          const expired="30d";
          const payload = {id,username}

          const token = JWT.sign(payload,JWT_SECRET,{expiresIn:expired})
          res.json({value:token,msg:"Logged In"})

        }else{
          res.json({value:null,msg:"Incorrect Password"})
        }
          
       }else{
        res.json({value:null,msg:"There is no registeration by this email"})
       }


    }catch(error){
      res.status(500).json({msg:error})
    }

}


