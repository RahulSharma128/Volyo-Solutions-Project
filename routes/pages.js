const express = require('express');
const bcrypt = require("bcryptjs");
const { verify } = require('jsonwebtoken'); 
const router = express.Router();
const dotenv = require('dotenv').config();
const {getUserPassword,getUserDetails} = require('../models/query');
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
  const secretKey = Buffer.from(base64EncodedSecret, 'base64').toString('utf-8');
  try {
    const decoded = verify(token, secretKey, { algorithms: ['HS256'] });
    request.user = decoded; 
   
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

// Login route
router.post('/login', JWTauthentication, async (request, response) => {
  const user = request.user;
  const userProvidedPassword = user.password;
  const emailToSearch = user.email;

  try {
    const storedPassword = await getUserPassword(emailToSearch);

    if (!storedPassword) {
      response.status(401).send('User not found');
      return;
    }

    const passwordMatch = await comparePasswords(userProvidedPassword, storedPassword);

    if (passwordMatch) {
      const userDetails = await getUserDetails(emailToSearch);

      if (userDetails) {
        response.send(userDetails);
      } else {
        response.status(404).send(`User with email ${emailToSearch} not found`);
      }
    } else {
      response.status(401).send('Incorrect password');
    }
  } catch (error) {
    console.error('Error:', error);
    response.status(500).send('Internal Server Error');
  }
});




module.exports = router;