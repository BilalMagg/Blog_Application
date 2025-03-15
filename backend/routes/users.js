const express=require('express');
const router=express.Router();
// const authmiddleware=require('../middleware/authmiddleware');

// const {registerUser, loginUser, getUserProfile, getallUserProfile}=require('../controllers/userController');
const {registerUser, loginUser, getUserProfile, getallUserProfile} = require('../controllers/userController');
const verifyPWT = require('../middleware/verifyPWT');
const sanitizeContent = require('../middleware/sanitation');
 //route d'inscription
router.post('/register',sanitizeContent,registerUser);
 //route de connexion
router.post('/login',verifyPWT,loginUser);
 //route de profile
router.get('/profile',getUserProfile);
router.get('/',getallUserProfile);
 

module.exports=router;