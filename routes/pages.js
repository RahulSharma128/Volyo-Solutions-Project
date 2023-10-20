const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();

//function authorization (){};

router.post('/login', (req, res) => {




  res.send('Hello, this is the root page!');

  
});

module.exports = router;
