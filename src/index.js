
import express from 'express';
import mongoose from 'mongoose';


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


// //model/schema
// const todoSchema = new mongoose.Schema({
//     task: { type: String, required: true },
//     priority: { type: String },
//     isCompleted: { type: Boolean, default: false },
//   });


  
// const Todo = mongoose.model('Todo', todoSchema);



const PORT = 3000;

//creating the instance of express
const app = express();

//express.json() middleware which parses and populates the json data of body to req.body
app.use(express.json());
let todos = [];

//posting the new todo
app.post('/', (req, res)=>{
    const newTodo = req.body;
    todos.push(newTodo);
});

//retreiving the todos
app.get('/', (req, res)=>{
    res.json(todos);
});

app.get('/:id', (req, res)=>{
    const todoId = req.params.id;
    const todoIndex = todos.findIndex((el)=> el.id == todoId );
    if(todoIndex == -1)
        res.status(404).send("Not found any task with given id.");
    else
        res.json(todos[todoIndex]);
    console.log("specific task using id");
});


//update

app.put('/:id', (req, res)=>{
    const todoId = req.params.id;
    const updatedtodo = req.body;

    const todoIndex = todos.findIndex((el)=>{
        return el.id == todoId;
    })
    if(todoIndex == -1)
        res.status(404).send("Not found any task with given id.");
    else
    {
        todos[todoIndex] = updatedtodo;
        res.json(todos[todoIndex]);
    }

    console.log(`Task with id: ${todoId} updated successfully`);
});


//delete

app.delete('/:id', (req, res)=>{
    const todoId = req.params.id;
    const todoIndex = todos.findIndex((el)=> el.id == todoId );
    if(todoIndex == -1)
        res.status(404).send("Not found any task with given id.");
    else
    {
        todos.splice(todoIndex, 1);
        res.send(`Task with id: ${todoId} deleted successfullt.`);
    }
});


//starting the server
app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`);
})


