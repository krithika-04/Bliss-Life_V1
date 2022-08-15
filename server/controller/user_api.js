const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require("dotenv").config();
const key =process.env.secret;const tokenList = {}
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service:"hotmail",
    auth:{
        user:process.env.mailid,
        pass:"black&white12"
    }
});
module.exports = class USER_API{
    //register
    static async register(req,res){
       try {
        const user_data = req.body;
        
    if (user_data.password !== user_data.confirm_password) {
        return res.status(201).json({
            msg: "Password do not match.",
            success: false
        });
    }
    // Check for the unique Username
   const chk_uname= await User.findOne({
        username: user_data.username
    })
    const chk_email= await User.findOne({
        email:user_data.email
    })
        if (chk_uname) {
           return  res.status(201).json({
            
                msg: "Username is already taken.",
                success: false,
            });
            
        }
    
    // Check for the Unique Email
  
   else if (chk_email) {
            return res.status(201).json({
                msg: "Email is already registred. Did you forgot your password.",
                success: false
            });
        }
    
    // The data is valid and new we can register the user
    
    // Hash the password
    //bcrypt.genSalt(10, (err, salt) => {
        const salt = await bcrypt.genSaltSync(10);
const password = await req.body.password;
 await   bcrypt.hash(password, salt, (err, hash) => {
            //if (err) throw err;
            user_data.password = hash;
            User.create(user_data);
          return  res.status(201).json({
            success: true,
              message:"user created"});
        });
   // });
       } catch (error) {
           res.status(404).json({message:error.message});
       }
    }
    //login
    static async login(req,res){
        
        try {
        await  User.findOne({
                username: req.body.username
            }).then(user => {
                if (!user) {
                    return res.status(201).json({
                        msg: "Username is not found.",
                        success: false
                    });
                }
                // If there is user we are now going to compare the password
             bcrypt.compare(req.body.password, user.password).then(isMatch => {
                    if (isMatch) {
                        // User's password is correct and we need to send the JSON Token for that user
                        const payload = {
                            _id: user._id,
                            username: user.username,
                            name: user.name,
                            email: user.email
                        }
                        // jwt.sign(payload, key, {
                        //     expiresIn: 604800
                        // }, (err, token) => {
                        //     res.status(200).json({
                        //         success: true,
                        //         token: `Bearer ${token}`,
                        //         user: user,
                        //         msg: "Hurry! You are now logged in."
                        //     });
                        // })
                       const token=  jwt.sign(payload, key, {
                            expiresIn: 604800
                        })
                        const refreshToken = jwt.sign(payload, key, { expiresIn: process.env.refreshTokenLife})
                        const response = {
                            success: true,
                            "status": "Logged in",
                            "token": `Bearer ${token}`,
                            user: user,
                            "refreshToken":`Bearer ${refreshToken}`,
                            msg: "Hurry! You are now logged in."
                        }
                        tokenList[`Bearer ${refreshToken}`] = response
                        console.log(tokenList);
                        res.status(200).json(response);
                    } else {
                        return res.status(201).json({
                            msg: "Incorrect password.",
                            success: false
                        });
                    }
                })
            });
            
        } catch (error) {
            res.status(404).json({message:error.message});
        }
     }
     static async Profile(req,res){
        try {
            return res.status(200).json({
                user: req.user
            });
        } catch (error) {
            res.status(404).json({message:error.message});
            
        }
     }
     static async token(req,res){
        try {
            const postData = req.body
            console.log(postData.refreshToken)
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const payload = {
             _id: postData._id,
             username: postData.username,
             name: postData.name,
            // token:postData.refreshToken,
             email: postData.email
        }
        const token =   jwt.sign(payload, key, {
            expiresIn: 604800
        })
        const response = {
            "token": `Bearer ${token}`,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
        } catch (error) {
            res.status(404).json({message:error.message});
        }
     }
     static async forgot(req,res,next){
        try {
           
        } catch (error) {
            res.status(404).json({message:error.message});
            
        }
     }
     static async forgotPass(req,res,next){
        try {
          const  userMail= req.body.email;
         
            const user= await User.findOne({
                email:userMail
            })
            console.log(user==null)
           //chk user exist or not
            if(user==null){
               // console.log("api")
                return res.status(201).json({
                    msg: "Email not registred.Please register to continue",
                    success: false
                });
            }//user exist and create one time link valid for 15 mins
            else{
                // console.log(user._id)
                // return res.status(200).json({
                //     msg: "Email  registred",
                //     success: true
                // });
                const fp_secret=key+user.password;
                const payload ={
                    email:user.email,
                    id:user._id
                }
                const token = jwt.sign(payload,fp_secret,{expiresIn:'15m'})
                const link=`http://localhost:8080/reset-password/${user._id}/${token}`
                console.log(link)
                const options={
                    from:"blisslife12001@outlook.com",
                    to:`${user.email}`,
                    subject:"Password reset request",
                    text:`Password reset request has been initiated please click the link to reset  ${link}.   Note: The will be active for only 15 mins`
                }
                transporter.sendMail(options,function(err,info){
                    if(err){
                        console.log(err)
                        return;
                    }
                    return res.status(200).json({
                        msg: "Password reset link has been sent to your email",
                        success: true
                    });
                })
                


            }


           
        } catch (error) {
            res.status(404).json({message:error.message});
            
        }
     }
     static async reset(req,res,next){
        try {
           const {id,token}=req.params;
           const user= await User.findById(id);
           const secret = key+user.password
           try {
            const payload=jwt.verify(token,secret)
            res.send(200).json({
               id:id,
               token:token,
                email:user.email
            })
           } catch (error) {
            console.log(error.message);
            res.send(404).json({message:error.message})
           }
          //check
        } catch (error) {
            res.status(404).json({message:error.message});
            
        }
     }
     static async resetPass(req,res,next){
        try {
            const {id,token}=req.params;
            var password=req.body.password;
            const user= await User.findById(id);
            
            const secret = key+user.password
            try {
                const payload=jwt.verify(token,secret)
                
                const salt = await bcrypt.genSaltSync(10);
                await  bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    
                    password = hash;
                  const update=   user.updateOne({password:password}).exec();
                console.log(update)
                  return  res.status(200).json({
                    msg: "Password reset successfull",
                    success: true
                    });
               });
                // return res.status(200).json({
                //     msg: "Password reset successfull",
                //     success: true
                // });
            } catch (error) {
                console.log(error.message);
                res.status(404).json({message:error.message})
            }
            
        } catch (error) {
            res.status(404).json({message:error.message});
            
        }
     }
    
}