const express=require('express');
const router=express.Router();
const authmiddleware=require('../middleware/authmiddleware');

const {registerUser, loginUser, getUserProfile}=require('../controllers/usercontroller');
 //route d'inscription
router.post('/register',registerUser);
 //route de connexion
router.post('/login',loginUser);
 //route de profile
router.get('/me',authmiddleware,getUserProfile);

module.exports=router;