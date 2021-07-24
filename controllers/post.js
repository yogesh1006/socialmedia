const Post = require('../models/post')


module.exports = {

    createPost : async (req, res) => {
        try {
            const {title, body, pic} = req.body
            if(!title || !body || !pic){
                throw {message : "Please add all the fields."}
            }
            // req.user.password = undefined
            // console.log(req.user);
            const post = new Post({
                title,
                body,
                photo: pic,
                postedBy: req.user
            })

            let newPost = await post.save()
            const posts = await Post.find().populate('postedBy','_id name').populate("comments.postedBy","_id name")

            res.json({
                status:'success',
                message:'Your post was sent.',
                data:posts
            })
        } catch (error) {
            res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to create post.'
            })
        }
    },

    getAllPosts : async (req, res) => {
        
        try {
            const posts = await Post.find().populate('postedBy','_id name').populate("comments.postedBy","_id name").sort({_id:-1})

            res.json({
                status:'success',
                data:posts
            })
        } catch (error) {
            res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to get posts.'
            })
        }

    },

    getUserPosts: async (req, res) => {

        try {
            let userPosts = await Post.find({postedBy : req.user._id}).populate('postedBy','_id name')

            res.json({
                data:userPosts
            })
        } catch (error) {
            res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to get posts.'
            })
        }
    },

    likePost: async (req, res) => {
        try {
           let updatedLikes = await Post.findByIdAndUpdate(req.body.postId,{
                $push: {likes: req.user._id }
            },{
                new: true
            })
            const posts = await Post.find().populate('postedBy','_id name').populate("comments.postedBy","_id name").sort({_id:-1})

            res.json({
                status:'success',
                message:'Liked Post success.',
                data:posts
            })
          } catch (error) {
            res.status(400).json({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                message: (error && error.message) || 'Oops! Failed to like post.'
            })
        }
    },

    unlikePost: async (req, res) => {
        try {
           let updatedLikes = await Post.findByIdAndUpdate(req.body.postId,{
                $pull: {likes: req.user._id }
            },{
                new: true
            })
            const posts = await Post.find().populate('postedBy','_id name').populate("comments.postedBy","_id name").sort({_id:-1})

            res.json({
                status:'success',
                message:'unliked Post success.',
                data:posts
            })
          } catch (error) {
            res.status(400).json({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                message: (error && error.message) || 'Oops! Failed to unlike post.'
            })
        }
    },

    addComment: async (req, res) => {
        try {
            let comment= {
                text: req.body.comment,
                postedBy: req.user._id
            }
            let newcomments = await Post.findByIdAndUpdate(req.body.postId,{
                 $push: {comments: comment}
             },{
                 new: true
             }).populate("comments.postedBy","_id name")
           
             const comments = await Post.find().populate('postedBy','_id name').populate("comments.postedBy","_id name").sort({_id:-1})

 
             res.json({
                 status:'success',
                 message:'comment success.',
                 data:comments
             })
           } catch (error) {
             res.status(400).json({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                 message: (error && error.message) || 'Oops! Failed to like post.'
             })
         }
    },

   

    deletePost: (req, res) =>{
        Post.findOne({_id:req.params.postId})
        .populate("postedBy","_id")
        .exec((err,post)=>{
            if(err || !post){
                return res.status(422).json({error:err})
            }
            if(post.postedBy._id.toString() === req.user._id.toString()){
                  post.remove()
                  .then(async (result)=>{
                    const posts = await Post.find().populate('postedBy','_id name').populate("comments.postedBy","_id name").sort({_id:-1})

                      res.json(posts)
                  }).catch(err=>{
                      console.log(err)
                  })
            }
        })
    },

    getOtherUserPosts: async (req, res) => {
        //  console.log(req.user);
        try {
            const posts = await Post.find({postedBy : {$in: req.user.following }}).populate('postedBy','_id name').populate("comments.postedBy","_id name").sort({_id:-1})
            //  console.log(posts);
            res.json({
                status:'success',
                data:posts
            })
        } catch (error) {
            res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to get posts.'
            })
        }

    }

}