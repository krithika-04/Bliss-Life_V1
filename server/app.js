//imports
// for cloudinary


const cloudinaryConfig  =require('./config/cloudinaryConfig') ;
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const {resolve} = require('path');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const passport = require('passport');


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Form Data Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
// Json Body Middleware
app.use(bodyParser.json());


// for local disk file upload =>
// app.use(express.static('uploads')); 
// app.use('/uploads',express.static(__dirname + '/uploads'));

// for cloudinary image upload =>
app.use('*', cloudinaryConfig);
app.use(express.static(resolve(__dirname+ 'src/public')));

mongoose.Promise = global.Promise;
app.use(passport.initialize());
// Bring in the Passport Strategy
require('./passport')(passport);
//db conn
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true,useCreateIndex:true,
    useFindAndModify: false
})
.then(()=>console.log("connected to db"))
.catch((err)=>console.log(err));
//start server
// routes prefix
app.use("/api/post",require("./routes/routes"))
if(process.env.NODE_ENV==="production"){
    app.use(express.static(__dirname+"/dist/"));
    app.get("*",(req,res)=>{
        res.sendFile(__dirname + "/dist/index.html");
    });
}
app.listen(port,()=>console.log(`server running at http://localhost:${port}`));