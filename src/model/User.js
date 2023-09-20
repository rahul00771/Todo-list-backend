import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userMail:{
        type: String,
        required: true
    },
    userPass: {
        type: String,
        required: true
    }

});

const users = mongoose.model('Users', userSchema);

export default users;