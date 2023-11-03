import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    
    task:{
        type: String,
        required: true
    },
    priority:{
        type: String,
        default: "low"
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    userMail:{
        type: String,
        reuired:true
    }
});

//To create the collection 'Todos' with todosSchema
const Todos = mongoose.model('Todos', todoSchema);

export default Todos;
