const express = require('express');
const multer = require('multer');
const router = express.Router();
const api = require('../controller/api')
const user_api = require('../controller/user_api')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const datauri= require('../datauri');
const tokenMiddleware=require('../controller/tokenMiddleware');
const {multerUploads, dataUri }=datauri;
//cloudinary


//multer middleware
/*  for local disk storage=>  let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + "_"+Date.now()+"_"+file.originalname)
    },
});
let upload = multer({
    storage:storage,
}).single('image');*/

//multer with cloudinary




router.post("/register",user_api.register);
router.post("/login",user_api.login);
router.post("/token",user_api.token);
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), user_api.Profile);
router.get("/",api.fetchAllPost);
router.get("/:id",api.fetchPostByID);
router.post("/",multerUploads,api.createPost);
router.patch("/:id",multerUploads,api.updatePost);
router.delete("/:id",api.deletePost);
// router.get('/secured-route', tokenMiddleware, async (req, res) => {
//     res.send("secured");
// });
router.get('/forgot-password',user_api.forgot)
router.post('/forgot-password',user_api.forgotPass);
router.get('/reset-password/:id/:token',user_api.reset)
router.post('/resetPassword/:id/:token',user_api.resetPass);
module.exports =router;