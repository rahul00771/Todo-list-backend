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
    }
});

const Todos = mongoose.model('Todos', todoSchema);

export default Todos;
