const Post = require('../models/posts');

const path = require('path') ;
const fs = require("fs");
const dataU = require('../datauri')
const {multerUploads, dataUri }=dataU;
const cloudinary= require('cloudinary') 
const Datauri =require('datauri/parser');
module.exports = class API{
    //fetch all posts
    static async fetchAllPost(req,res){
       try {
        const username = req.query.user;
        const category = req.query.cat;
          // const posts = await Post.find();
          // res.status(200).json(posts);
          let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (category) {
      posts = await Post.find({category});
    }
    else{
        posts = await Post.find();
       
    }
    res.status(200).json(posts);
       } catch (error) {
           res.status(404).json({message:error.message});
       }
    }
    //fetch single posts by id
    static async fetchPostByID(req,res){
       const id = req.params.id;
       try {
           const post = await Post.findById(id);
           res.status(200).json(post);
       } catch (error) {
           res.status(404).json({message:error.message});
       }
    }
    //create a post 
    static  createPost(req,res){
        const post = req.body;
        
        
        
        // const imagename = req.file.filename;
        
        try {
            if(req.file) {
                const dUri = new Datauri();
                const imagename = req.file.originalname;
                //console.log(imagename);
                const dataUri = req => dUri.format(path.extname(imagename).toString(), req.file.buffer);
                const file = dataUri(req).content;
                cloudinary.uploader.upload(file).then((result) => {
                post.image = result.url;
                //console.log(result.url);
                post.img_name= result.public_id;
                
                }).then(()=>{
                    Post.create(post);
                    res.status(201).json({message:"Post created"});
                })
                 
            }
            //post.image = image;
            
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    }
    //update a post 
    static async updatePost(req,res){
        const id = req.params.id;
        const  newPost = req.body;
        let new_image =""
        
        
            try{
                if(req.file){
                    const imagename = req.file.originalname;
                            const dUri = new Datauri();   
                                const dataUri = req => dUri.format(path.extname(imagename).toString(), req.file.buffer);
                            //new_image = req.file.filename;
                
                            // try {
                            //    fs.unlinkSync('./uploads/'+req.body.old_image); 
                            // } catch (error) {
                            //     console.log(error);
                            // }
                
                            const file = dataUri(req).content;
                           cloudinary.uploader.upload(file).then((result) => {
                           
                           newPost.image = result.url;
                           newPost.img_name= result.public_id;
                           
                            }).then(()=>{
                                const old_img_name = req.body.old_img_name;
                                cloudinary.uploader.destroy(old_img_name, function(result) { console.log(result) });
                                const singlepost=Post.findById(id);
                                singlepost.updateOne(newPost).exec();
                                res.status(200).json({message: 'Post updated'});
                                
                            }).catch((err)=>{
                                console.log(err)
                            })
                   
                } else{
                    new_image = req.body.old_image;
                    newPost.image = new_image;
                    
                    const singlepost=Post.findById(id);
                                singlepost.updateOne(newPost).exec();
                                res.status(200).json({message: 'Post updated'});
                                
                }
            } catch(error)
            {
                res.status(404).json({message:error.message});
            }
    }
    //delete a post 
    static async deletePost(req,res){
       const id = req.params.id;

       try{
           const result = await Post.findByIdAndDelete(id);
           const old_img_name = result.img_name;
           
           cloudinary.uploader.destroy(old_img_name, function(result) { console.log(result) });
           res.status(200).json({message: 'Post deleted'});
       }catch(error)
       {
           res.status(404).json({message:error.message});
       }
    }
}