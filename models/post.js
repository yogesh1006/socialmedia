const mongoose = require('mongoose')
const moment = require("moment");


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
        }
    }],
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    created_at: {
        type: Date,
        default: moment().unix() * 1000,
      },
})

postSchema.pre("save", function () {
    let post = this;
    post.created_at = moment().unix() * 1000;
  });

module.exports = mongoose.model("Post", postSchema);