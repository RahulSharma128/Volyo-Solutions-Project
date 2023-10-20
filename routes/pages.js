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
  //console.log(authorizationHeader);

  const tokenParts = authorizationHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
    console.error('Invalid authorization header');
    //console.log(tokenParts[1]);
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
// Login route
router.post('/login', JWTauthentication, (request, response) => {
  const user = request.user;
  const userProvidedPassword = user.password;
  const emailToSearch = user.email;

  getUserPassword(emailToSearch)
    .then((password) => {
      if (password) {
        bcrypt.compare(userProvidedPassword, password, (err, result) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            response.status(500).send('Internal Server Error');
          } else if (result) {
            getUserDetails(emailToSearch)
              .then((userDetails) => {
                if (userDetails) {
                  response.send(userDetails);
                } else {
                  response.send(`User with email ${emailToSearch} not found.`);
                }
              })
              .catch((error) => {
                console.error('Error getting user details:', error);
                response.status(500).send('Internal Server Error');
              });
          } else {
            response.status(401).send('Incorrect password');
          }
        });
      } else {
        response.send(`No password found for email: ${emailToSearch}`);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      response.status(500).send('Internal Server Error');
    });
});


module.exports = router;