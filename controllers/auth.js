const express = require('express');
const bcrypt = require("bcryptjs");
const { verify } = require('jsonwebtoken'); 
const router = express.Router();
const dotenv = require('dotenv').config();
const {getUserPassword,getUserDetails,addNewUser} = require('../models/query');
const JWTAuthentication = require('../middleware/AuthGuard');
// Define a function to compare passwords with better error handling
async function comparePasswords(providedPassword, storedPassword) {
  try {
    return await bcrypt.compare(providedPassword, storedPassword);
  } catch (error) {
    throw error;
  }
}
// Define a function to login any user or admin.
router.get('/login', JWTAuthentication, async (request, response) => {
  const {email, password } = request.headers;
  try {
    const storedPassword = await getUserPassword(email);

    if (!storedPassword) {
      response.status(401).send(`User with email ${email} not found`);
      return;
    }
    const passwordMatch = await comparePasswords(password, storedPassword);
    if (passwordMatch) {
      const userDetails = await getUserDetails(email);
      if (userDetails) {
        response.send(userDetails);
      } else {
        response.status(404).send(`User with email ${email} not found`);
      }
    } else {
      response.status(401).send('Incorrect password');
    }
  } catch (error) {
    console.error('Error:', error);
    response.status(500).send('Internal Server Error');
  }
});

// register a partner user under a partner id with neccessay info.
router.post('/register', JWTAuthentication, async (request, response) => {
const userData = request.body;
try{
  const addUser = await addNewUser(userData);
  if (addUser.success){
    response.status(201).json(addUser.user);
  } else {
    response.status(400).json({ error: 'User creation failed' });
  }
}catch (error) {
    console.error('Error:', error);
    response.status(500).send('Internal Server Error');
  }
});



module.exports = router;

