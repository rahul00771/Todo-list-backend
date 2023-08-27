
import express from 'express';
import mongoose from 'mongoose';
import router from './routers/routes.js';

let todos = [];

const PORT = 3000;

//mongodb part
const uri = "mongodb+srv://todolist_developer:yDJbmj0Pjzd0JVxp@cluster0.1estgsm.mongodb.net/?retryWrites=true&w=majority";

//connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Mongo connected");
})
.catch((error)=>{
    console.log("error connecting");
})


//creating the instance of express
const app = express();

//express.json() middleware which parses and populates the json data of body to req.body
app.use(express.json());

//routings

//here '/todos' is the prefix endpoint, means /:id will be considered as /todos/:id
app.use('/todos', router);


//starting the server
app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`);
})


