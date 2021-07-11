const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../middleware/isUserAuthenticated')
const Validate = require('../validations') 
const UserController = require('../controllers/user')
const PostController = require('../controllers/post')
const UsersController =require('../controllers/users')

router.all('/api/*', isUserAuthenticated)


// user routes
router.post("/register",Validate.validateSignup(),UserController.register);
router.post("/login",Validate.validateLogin(),UserController.login);

//post routes
router.post("/api/create_post", PostController.createPost)
router.get("/api/get_all_posts", PostController.getAllPosts)
router.get("/api/get_user_posts", PostController.getUserPosts)
router.put("/api/like_post",PostController.likePost)
router.put("/api/unlike_post",PostController.unlikePost)
router.put("/api/add_comment",PostController.addComment)
router.delete("/api/delete_post/:postId",PostController.deletePost)
router.get("/api/get_otheruser_posts",PostController.getOtherUserPosts)

//users routes
router.get("/api/get_userprofile/:id",UsersController.userProfile)
router.put("/api/follow",UsersController.follow)
router.put("/api/unfollow",UsersController.unfollow)
router.put("/api/update_pic",UsersController.updatepic)




module.exports = router;
