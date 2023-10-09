import sequelizeInstance from './server.js';
import Task from './model.js';

const dataToSeed = [
  {
    id: 74529789,
    time: '2023-10-06 17:25:18',
    title: 'Task 89',
    completed: 0,
  },
  {
    id: 74529790,
    time: '2023-10-06 17:26:09',
    title: 'Task 89',
    completed: 0,
  },
  {
    id: 74529791,
    time: '2023-10-06 17:29:46',
    title: 'Task 911',
    completed: 0,
  }
];

export default async function seedDatabase() {
  try {
    await sequelizeInstance.sync(); // Ensure the database schema is ready

    for (const data of dataToSeed) {
      await Task.create(data); // Insert data into the Task table
    }
    console.log('Data seeded successfully.');
    return 1;
  } catch (error) {
   // console.error('Error seeding data:', error);
   return error
  } 
}


