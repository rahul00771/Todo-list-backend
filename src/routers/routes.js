
import express from 'express';
import Todos from '../model/todos.js';

const router = express.Router();

//post request -> save()
router.post('/', async (req, res) => {

    //geting the data from the body
    const todo = new Todos({
        task : req.body.task,
        priority : req.body.priority
    })

    try{
        //saving the data, using save function (use await)
        const savedData = await todo.save();
        res.json(savedData);
    }
    catch(error)
    {
        console.log("Error: " + error);
    }
    
});

//get all todos -> find()
router.get('/', async(req, res) => {

    try {
        
        const fetchedData = await Todos.find();
        res.json(fetchedData);

    } catch (error) {
        console.log("Error: " + error);
    }
    
});

//get todos with a specific id -> findById
router.get('/:id', async(req, res) => {
    try {
        const fetchedData = await Todos.findById(req.params.id);

        //if todo with id is not found
        if(!fetchedData)
        {
            res.status(404).json(`Todo with id: ${req.params.id} is not found.`);
        }
        else
        {   
            res.json(fetchedData);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
});

//updating a todo with specific id -> findByIdAndUpdate()
router.put('/:id', async(req, res) => {

    try {
        
        const updatedtodo = await Todos.findByIdAndUpdate(
            //passing the id
            req.params.id,
            //passing the new data
            req.body,
            //giving new:true returns the updated value
            {new: true}
        );

        //if todo with that id not found
        if(!updatedtodo)
        {
            res.status(404).json(`Todo with id: ${req.params.id} not found.`)
        }

        else
        {   
            res.json(updatedtodo);
        }

    } catch (error) {
        console.log("Error: " + error);
    }

});

//deleting a todo with specific id -> findByIdAndDelete
router.delete('/:id', async(req, res) => {

    try {

        await Todos.findByIdAndDelete(
            req.params.id
        )
        res.json({ message: 'Todo deleted' });
        
    } catch (error) {
        console.log("Error: " + error);
    }

});



export default router;