
import express from 'express';

const router = express.Router();


//--------------TODO : import schema and then replace todos with schema--------------------//

let todos = [];

//posting the new todo
router.post('/todos/', (req, res)=>{
    const newTodo = req.body;
    todos.push(newTodo);
});

//retreiving the todos
router.get('/todos/', (req, res)=>{
    res.json(todos);
});

router.get('/todos/:id', (req, res)=>{
    const todoId = req.params.id;
    const todoIndex = todos.findIndex((el)=> el.id == todoId );
    if(todoIndex == -1)
        res.status(404).send("Not found any task with given id.");
    else
        res.json(todos[todoIndex]);
    console.log("specific task using id");
});


//update

router.put('/todos/:id', (req, res)=>{
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

router.delete('/todos/:id', (req, res)=>{
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

export default router;