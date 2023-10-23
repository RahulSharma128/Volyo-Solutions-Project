const bcrypt = require('bcryptjs');
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
        return null; 
      }
    } catch (error) {
      console.error('Error getting user details:', error);
      return null;
    }
  }

async function addNewUser(userData) {
  const {  partner_id, username, email, password, designation, location, role } = userData;

  try {
  const existingUser = await PartnerUser.findOne({ where: { email } });
  if (existingUser) {
      return { success: false, message: 'User already exists' };
    }
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await PartnerUser.create({
      partner_id,username,email,password: hashedPassword,designation,location,role});
    if (newUser) {
      return { success: true, user: newUser };
    } else {
      return { success: false, message: 'Failed to create a new user' };
    }
  } catch (error) {
    console.error('Error adding a new user:', error);
    return { success: false, message: 'Internal Server Error' };
}}
  
module.exports = {
  getUserPassword,
  getUserDetails,
  addNewUser
};