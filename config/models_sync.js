const sequelize = require('./db');
const PartnerTable = require('../models/partners_table');
const PartnerUser = require('../models/partner_users');
const Role = require('../models/rolesAndPermissions');

// Define the associations first
PartnerUser.belongsTo(PartnerTable, { foreignKey: 'partner_id' });
PartnerUser.belongsTo(Role, { foreignKey: 'role_id' });

// Seeders
const seedRoles = require('../seeders/rolesandpermissionsSeeders');
const seedPartnerUsers = require('../seeders/partnerUsersSeeder');

// Perform the migration and seeding
sequelize.sync()
  .then(async () => {
    console.log('Database is synchronized.');
    // Seed roles and partner users
    await seedRoles();
    await seedPartnerUsers();

    console.log('Seeding is complete.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  })
  .finally(async () => {
    // Close the database connection
    await sequelize.close();
    console.log('Database connection closed.');
  });
