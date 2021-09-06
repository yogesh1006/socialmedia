const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
    },
    likes:[{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    comments:[{
        text:String,
        postedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        created_at: {
            type: Date,
            default: Date.now
        },
    }],
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    created_at: {
        type: Date,
        default: Date.now
      },
})

// postSchema.pre("save", function () {
//     let post = this;
//     post.created_at = Date.now;
//   });

module.exports = mongoose.model("Post", postSchema);