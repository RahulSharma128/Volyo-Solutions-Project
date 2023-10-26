const sequelize = require('./db');
const PartnerTable = require('../models/partners_table');
const PartnerUser = require('../models/partner_users');

// Define the associations first
PartnerUser.belongsTo(PartnerTable, { foreignKey: 'partner_id' });
// Seeders
const seedPartnerUsers = require('../seeders/partnerUsersSeeder');

// Perform the migration and seeding
sequelize.sync()
  .then(async () => {
    console.log('Database is synchronized.');
    // Seed roles and partner users
    await seedPartnerUsers();


    console.log('Seeding is complete.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  })
  .finally(async () => {
    // Close the database connection
   // await sequelize.close();
    console.log('Database connection closed.');
  });
