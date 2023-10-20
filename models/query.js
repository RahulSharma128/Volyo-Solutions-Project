const PartnerUser = require('./partner_users');

async function getUserPassword(email) {
  const user = await PartnerUser.findOne({
    where: { email },
    attributes: ['password'],
  });
  return user ? user.password : null;
}

async function getUserDetails(email) {
    try {
      const user = await PartnerUser.findOne({
        where: { email },
        attributes: ['id', 'partner_id', 'role'],
      });
  
      if (user) {
        return user.dataValues;
      } else {
        return null; // User not found
      }
    } catch (error) {
      console.error('Error getting user details:', error);
      return null; // Handle the error, return null, or perform appropriate error handling
    }
  }
  
  module.exports = {
    getUserPassword,
    getUserDetails,
  };