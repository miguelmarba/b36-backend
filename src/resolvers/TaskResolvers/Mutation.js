const { createTask, updateTask, deleteTask } = require('../../services/TaskService');

const { getOneContact } = require('../../services/ContactService');

const { getOneAuthor } = require ('../../services/ContactService');

const storage = require('../../utils/storage');

const createNewTask = async (_, {data}, {user}) => {
    //data.employe = user._id; // para guardar el usuario que crea el Task
    if(data.document){
        const { createReadStream } = await data.document;
        const stream = createReadStream();
        const file = await storage({stream});
        data = {
            ...data,
            document: file.url,
        };
    }

    const task = await createTask(data);
    const contact = await getOneContact(data.contact);
    contact.tasks.push(task);
    contact.save();
    return task;
}

const updateOneTask = async (_, {id, data}, {contact}) => {
    data.task = contact._id;
    if( data.document ){
        const { createReadStream } = await data.document;
        const stream = createReadStream();
        const file = await storage({stream});
        data = {
            ...data,
            document: file.url,
        }

        const task = await updateTask(id, data);
        if(!task){
            throw new Error('Task not exist');
        }
        return task;
    }
}

const deleteOneTask = async(_, {id}) => {
    const task = await deleteTask(id);
    if(!task){
        throw new Error('Task not exist');
    }
    return 'Task deleted';
}

module.exports = {
    createNewTask,
    updateOneTask,
    deleteOneTask
}