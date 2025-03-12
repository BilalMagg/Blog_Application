const express=require('express');
const router=express.Router();
// const authmiddleware=require('../middleware/authmiddleware');

// const {registerUser, loginUser, getUserProfile, getallUserProfile}=require('../controllers/userController');
const {registerUser, loginUser, getUserProfile, getallUserProfile} = require('../controllers/userController');
 //route d'inscription
router.post('/register',registerUser);
 //route de connexion
router.post('/login',loginUser);
 //route de profile
router.get('/profile',getUserProfile);
router.get('/',getallUserProfile);
router.post('/request-reset-code', requestResetCode);
router.post('/reset-password',reserPassword );
 
module.exports=router;