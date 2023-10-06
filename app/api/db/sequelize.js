import getAllTasks  from './model.js';
async function retrieveAllTasks() {
  try {
    const tasks = await getAllTasks();
    console.log('All tasks:', tasks.map((task) => task.toJSON()));
  } catch (error) {
    console.error('Error in Next.js route:', error);
  }
}

export { retrieveAllTasks };
