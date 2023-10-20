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

  async function addNewUser(userData) {
    const { id, partner_id, username, email, password, designation, location, role } = userData;
    try {
      // Check if the user with the given email already exists
      const existingUser = await PartnerUser.findOne({ where: { email } });
  
      if (existingUser) {
        return { success: false, message: 'User already exists' };
      }
  
      // If the user doesn't exist, create a new user record with additional attributes
      const newUser = await PartnerUser.create({
        id, partner_id, username, email, password, designation, location, role 
      });
  
      if (newUser) {
        return { success: true, user: newUser };
      } else {
        return { success: false, message: 'Failed to create a new user' };
      }
    } catch (error) {
      console.error('Error adding a new user:', error);
      return { success: false, message: 'Internal Server Error' };
    }
  }
  
  
  
  module.exports = {
    getUserPassword,
    getUserDetails,
    addNewUser
  };