const bcrypt = require('bcrypt');
const  jwt=require('jsonwebtoken');
const {User}=require('../models');
const { Sequelize, Op } = require('sequelize');

//fonction pour enregistrer un utilisateur
const registerUser=async (req,res)=>{
  const {username,email,password,role}=req.body;
  try{
  const exist=await User.findOne({where :{email}});
  if(exist){
    return res.status(400).json({message :"user already exists"});
  }
  
 const hashedpassword=await bcrypt.hash(password,10);

 const newuser=await User.create({
  username,
  email,
  password_hash:hashedpassword,
  role
 });
 return res.status(201).json({message: "User created successfully"});
}catch(err){
  return res.status(500).json({message: "server error"});
}
}
//fonction pour connexion
const loginUser=async (req,res)=>{
  const {email,password}=req.body;
  try{
    let user = await User.findOne({
      where: { [Sequelize.Op.or]: [{ email }, { username: email }] }
    });    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
  }
  // Vérifier le mot de passe
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
  }
  // Générer un token JWT
  const token = jwt.sign({id: user.id ,email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: "Login successful", token });
  }catch(err){
    return res.status(500).json({message: "server error",details:err.message});
  }
}
// fonction pour avoir profile d'un seul utilisateur
const getUserProfile=async(req,res)=>{
  try{
    const user=await User.findByPk(req.user.id,{
      attributes:{exclude :['password_hash']}
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
} catch (error) {
  res.status(500).json({ message: "server error", error });
}
}
//fonction pour avoir tout les utilisateurs
const getallUserProfile=async (req,res)=>{
 try{
  const users=await User.findAll({attributes: {exclude: ['password_hash']}
 });
 res.status(200).json(users);
 }catch(err){
  console.error("Error fetching users:",err);
  res.status(500).json({ message: "server error"});
 }
}
const requestResetCode = async (email) => {
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rows.length === 0) {
    return false; 
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString(); 

  await transporter.sendMail({
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Password Reset Code',
    text: `Your reset code is: ${code}`,
  });

  return true; 
};
const resetPassword = async (email, code, newPassword) => {
  if (!verifyResetCode(email, code)) {
    return false; 
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
  
  resetCodes.delete(email); 

  return true; 
};



module.exports = { registerUser, loginUser, getUserProfile, getallUserProfile};