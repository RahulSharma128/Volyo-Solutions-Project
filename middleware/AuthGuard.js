const { verify } = require('jsonwebtoken');

function JWTAuthentication(request, response, next) {
  console.log(request.headers);
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
    const decoded = verify(token, secretKey, { algorithms: ['HS256'] });
    next(); // Continue to the next middleware or route
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return response.status(401).send('Unauthorized');
  } 
}

module.exports = JWTAuthentication;
