const Tasks = require('../models/Tasks');

const createTask = async (data) => {
    const task = await Tasks.create(data);
    const populateTask = await getOneTask(task._id);
    return populateTask;
};

const getOneTask = (id) => Tasks.findOne({
    _id: id,
    is_active: true,
}).populate('task');

const getAllTasks = () => Tasks.find({
    is_active: true
}).populate('task');

const updateTask = ( id, data ) => Tasks.findOneAndUpdate({
    _id: id,
    is_active: true
},{
    ...data
}, {
    new: true
}).populate('task');

const deleteTask = (id) => Tasks.findOneAndUpdate({
    _id: id,
    is_active: true,
}, {
    is_active: false,
});

module.exports = {
    createTask,
    getOneTask,
    getAllTasks,
    updateTask,
    deleteTask,
}