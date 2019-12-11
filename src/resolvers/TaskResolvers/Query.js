const { getAllTasks, getOneTask } = require('../../services/TaskService');

const getTasks = async () => {
    const tasks = getAllTasks();
    return tasks;
}

const getSingleTask = async (_, { id }) => {
    const task = await getOneTask(id);
    if(!task){
        throw new Error('Task not exists');
    }
    return task;
}

module.exports = {
    getTasks,
    getSingleTask
} 