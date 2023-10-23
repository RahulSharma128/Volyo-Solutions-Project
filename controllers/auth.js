const express = require('express');
const bcrypt = require("bcryptjs");
const { verify } = require('jsonwebtoken'); 
const router = express.Router();
const dotenv = require('dotenv').config();
const {getUserPassword,getUserDetails,addNewUser} = require('../models/query');

// JWTauthentication function
function JWTauthentication(request, response, next) {
  const authorizationHeader = request.headers['authorization'];
  if (!authorizationHeader) {
    console.error('Authorization header is missing');
    return response.status(401).send('Unauthorized');
  }
 const tokenParts = authorizationHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
    console.error('Invalid authorization header');
    return response.status(401).send('Unauthorized');
  }
  const token = tokenParts[1];
  const base64EncodedSecret = process.env.secretKey;
  const secretKey = Buffer.from(base64EncodedSecret, 'base64');
  try {
    //console.log(secretKey);
    const decoded = verify(token, secretKey, { algorithms: ['HS256'] });
    next(); // Continue to the next middleware or route
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return response.status(401).send('Unauthorized');
  }
}
// Define a function to compare passwords with better error handling
async function comparePasswords(providedPassword, storedPassword) {
  try {
    return await bcrypt.compare(providedPassword, storedPassword);
  } catch (error) {
    throw error;
  }
}

router.get('/login', JWTauthentication, async (request, response) => {
  const {email, password } = request.body;
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

// register route
router.post('/register', JWTauthentication, async (request, response) => {
const userData = request.body;
console.log(userData);

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

