import mongoose from 'mongoose';

const todosSchema = mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    priority:{
        type: String
    },
    isCompleted:{
        type: Boolean,
        default: false
    }
});

export default todosSchema;
