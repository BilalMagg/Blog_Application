const express=require('express');
const router=express.Router();
const authmiddleware=require('../middleware/userauthmiddleware');

const {registerUser, loginUser, getUserProfile, getallUserProfile}=require('../controller/Usercontroller');
 //route d'inscription
router.post('/register',registerUser);
 //route de connexion
router.post('/login',loginUser);
 //route de profile
 router.get('/profile',authmiddleware,getUserProfile);
 router.get('/users',authmiddleware,getallUserProfile);
 
module.exports=router;