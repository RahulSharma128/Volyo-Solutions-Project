const Role = require('../models/rolesAndPermissions');
const sequelize = require('../config/db.js');
const roles = [
  {
    role: 'Admin',
    permission: 'Full Access',
  },
  {
    role: 'Moderator',
    permission: 'Moderate Content',
  },
  {
    role: 'Editor',
    permission: 'Edit Content',
  },
  {
    role: 'User',
    permission: 'Basic Access',
  },
];

const seedRoles = async () => {
  try {
    // Check if there are existing records in the role_table
    const existingRecordsCount = await Role.count();
    // If there are no existing records, insert the seed data
    if (existingRecordsCount === 0) {
      await Role.bulkCreate(roles);
      console.log('Roles seeded successfully.');
    } else {
      console.log('Roles already exist in the database. Seed operation skipped.');
    }
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    // Close the database connection if needed
    // await sequelize.close();
  }
};

//seedRoles();
module.exports = seedRoles;