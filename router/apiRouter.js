const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

/*
    USAGE : Get all the Blogs
    URL : http://127.0.0.1:5000/api/blogs
    Method : GET
   
 */
router.get('/blogs', async (request , response) => {
    try {
        let blogs = await Blog.find().sort({$natural:-1}); //.sort({$natural:-1});this is stored based on time and displayed based on time(LIFO)-LAST IN FIRST OUT.
        response.status(200).json(blogs);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

/*
    USAGE : Get a Single Blog
    URL : http://127.0.0.1:5000/api/blogs/:id
    Method : GET

 */
router.get('/blogs/:id', async (request , response) => {
    try {
        let blogId = request.params.id;
        let blog = await Blog.findById(blogId);
        response.status(200).json(blog);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

/*
    USAGE : Create a Blog
    URL : http://127.0.0.1:5000/api/blogs/
    Method : POST
   
 */
router.post('/blogs', async (request , response) => {
    try {
        let newBlog = {
            name : request.body.name,
            image : request.body.image,
            infoURL : request.body.infoURL,
            heading : request.body.heading,
            info : request.body.info,
            created : request.body.created
        };
        // blog is Exists or not
        let blog = await Blog.findOne({name : newBlog.name});
        if(blog){
            return response.status(401).json({
                msg : 'Blog is Already Exists'
            })
        }
        blog = new Blog(newBlog);
        blog = await blog.save(); // insert the blog to database
        response.status(200).json({
            result : 'Blog is Created',
            blog : blog
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

/*
    USAGE : Update a Blog
    URL : http://127.0.0.1:5000/api/blogs/:id
    Method : PUT
  
 */
router.put('/blogs/:id', async (request , response) => {
    let blogId = request.params.id;
    try {
        let updatedBlog = {
            name : request.body.name,
            image : request.body.image,
            infoURL : request.body.infoURL,
            heading : request.body.heading,
            info : request.body.info,
            created : request.body.created
        };
        // blog is exists or not
        let blog = await Blog.findById(blogId);
        if(!blog){
            return response.status(401).json({
                msg : 'No Blog Found'
            });
        }
        // blog updation successfull
        blog = await Blog.findByIdAndUpdate(blogId , {
            $set : updatedBlog
        }, { new : true});

        // blog = await blog.save();

        response.status(200).json({
            result : 'Blog is Updated',
            blog : blog
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

/*
    USAGE : Delete a Blog
    URL : http://127.0.0.1:5000/api/blogs/:id
    Method : DELETE
  
 */
router.delete('/blogs/:id', async (request, response) => {
    try{
        let blogId = request.params.id;
        // blog is exists or not
        let blog = await Blog.findById(blogId);
        if(!blog){
            return response.status(401).json({
                msg : 'No Blog Found'
            });
        }
        //delete a blog successfull
        blog = await Blog.findByIdAndDelete(blogId);
        response.status(200).json({
            result : 'Blog is Deleted',
            blog : blog
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

module.exports = router;
