const PartnerUser  = require('../models/partner_users'); // Import your Sequelize model

const partnerUsers = [
  {
    partner_id: 9636,
    username: 'Rishi5',
    email: 'rishi5@gmail.com',
    password: '$2a$10$q0bTudgQ1aHWfqSp/yfshuFdQdAhVd40syQZYAjK/1tyf0EUkQ55.', // Hashed password
    designation: 'chief',
    location: 'jaipur',
    role: 'approver'
  },
  {
    partner_id: 9636,
    username: 'Mihir',
    email: 'mihir@gmail.com',
    password: '$2a$12$eIJumLmQyW0GuCg1.pG4GuePQNWyOj2gYPbngtT2RKZ5WVld47jUG', // Hashed password
    designation: 'doctor',
    location: 'location577',
    role: 'admin'
  },
  {
    partner_id: 8955,
    username: 'Rahul',
    email: 'rahul@gmail.com',
    password: '$2a$10$xcoiafm4dDVQOUadPxEZDuo1YaxkjfjxraAzDKwKGUMcs1EFuid5S', // Hashed password
    designation: 'md',
    location: 'location577',
    role: 'admin'
  },
  {
    partner_id: 8955,
    username: 'Rishi4',
    email: 'rishi4@gmail.com',
    password: '$2a$10$kKX6AMlcc1bhYRb3tREroOwAdlFDjVbr0gAruNk6TkSNT1/UfKc7m', // Hashed password
    designation: 'chief',
    location: 'jaipur',
    role: 'creater'
  },
];

// Seed the data
const seedPartnerUsers = async () => {
  try {
    // Check if there are existing records in the partner_users table
    const existingRecordsCount = await PartnerUser.count();
    
    // If there are no existing records, insert the seed data
    if (existingRecordsCount === 0) {
      await PartnerUser.bulkCreate(partnerUsers);
      console.log('Partner users seeded successfully.');
    } else {
      console.log('Partner users already exist in the database. Seed operation skipped.');
    }
  } catch (error) {
    console.error('Error seeding partner users:', error);
  } finally {
    // Close the database connection if needed
    // await sequelize.close();
  }
  };
  
  
module.exports = seedPartnerUsers;
