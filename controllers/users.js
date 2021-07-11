const Post = require('../models/post')
const User = require('../models/user')


module.exports = {

    userProfile: async (req, res) => {
        try {
            
            let user = await User.findOne({_id:req.params.id}).select("-password")
            // console.log(user);

            let posts=await Post.find({postedBy: req.params.id}).populate("postedBy","_id name")

            // console.log(posts);

            res.json({
                user,
                posts
            })
            
        } catch (error) {
            res.status(400).json({
                message: (error && error.message) || 'Oops! user not found.'
            })
        }

    },

    follow:async (req, res) => {

       try {
        let user = await  User.findByIdAndUpdate(req.body.followId , {
            $push: {followers: req.user._id}
        },{new : true}).select("-password")

        let user1 =  await User.findByIdAndUpdate(req.user._id, {
            $push:{following: req.body.followId }
        },{new: true}).select("-password")

        res.json({
           status:"success",
           message:"Follow user success.",
           data:{user , user1}
        })

       } catch (error) {
        res.status(400).json({
            message: (error && error.message) || 'Oops! failed to follow user.'
        })
       }
    },

    unfollow:async (req, res) => {

        try {
         let user = await  User.findByIdAndUpdate(req.body.unfollowId , {
             $pull: {followers: req.user._id}
         },{new : true}).select("-password")
 
         let user1 =  await User.findByIdAndUpdate(req.user._id, {
             $pull:{following: req.body.unfollowId }
         },{new: true}).select("-password")
 
         res.json({
            status:"success",
            message:"unfollow user success.",
            data:{user , user1}
         })
 
        } catch (error) {
         res.status(400).json({
             message: (error && error.message) || 'Oops! failed to unfollow user.'
         })
        }
     },

     updatepic: async (req,res) => {
          try {
              let updatedPic = await User.findByIdAndUpdate(req.user._id, {$set:{pic : req.body.pic}},{new: true}) 

               res.json({
                   status:"success",
                   message:"Profile pic uplosded successfully.",
                   data:updatedPic
               })
          } catch (error) {
            res.status(400).json({
                message: (error && error.message) || 'Oops! failed to update pic.'
            })
          }
     }
}