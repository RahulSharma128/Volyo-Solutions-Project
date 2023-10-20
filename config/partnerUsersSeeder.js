const { PartnerUser } = require('../models/partner_users.js'); // Import your Sequelize model

const partnerUsersData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1',
    designation: 'Designer',
    location: 'New York',
    role: 'User',
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2',
    designation: 'Developer',
    location: 'Los Angeles',
    role: 'Admin',
  },
  {
    username: 'user3',
    email: 'user3@example.com',
    password: 'password3',
    designation: 'Manager',
    location: 'Chicago',
    role: 'User',
  },
  {
    username: 'user4',
    email: 'user4@example.com',
    password: 'password4',
    designation: 'Tester',
    location: 'Houston',
    role: 'User',
  },
  {
    username: 'user5',
    email: 'user5@example.com',
    password: 'password5',
    designation: 'Analyst',
    location: 'San Francisco',
    role: 'Admin',
  },
];

// Seed the data
const seedPartnerUsers = async () => {
    try {
      const createdUsers = await PartnerUser.bulkCreate(partnerUsersData);
      console.log('Users created successfully:', createdUsers);
    } catch (error) {
      console.error('Error creating users:', error);
    }
  };
  
  seedPartnerUsers(); 

  
module.exports = seedPartnerUsers;
