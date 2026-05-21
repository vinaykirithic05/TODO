// backend/controllers/todoController.js
import Todo from '../models/Todo.js'

// Creating Todo

export const createTodo = async (req,res)=>{
    try {
        const {title , description , priority} = req.body;
        if(!title){
            return res.status(400).json({message : "Title is Required !"})
        } 
        const todo = await Todo.create({
            title,
            description,
            priority,
            userId:req.user._id
        })
        res.status(201).json(todo)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Getting All Todo

export const getTodo = async (req,res) =>{
    try {
        const todos = await Todo.find({userId : req.user._id})
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Updating Todo

export const updateTodo = async(req,res)=>{
    try{
        const {id} = req.params;
        const todo = await Todo.findById(id)
        if(!todo){
            return res.status(404).json({message :"Todo not Found ! "})
        }
        if(todo.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({message : "Not Authorized to update the Todo !"})
        }
        todo.title = req.body.title || todo.title
        todo.description = req.body.description || todo.description
        todo.priority = req.body.priority || todo.priority
        if(req.body.isCompleted !== undefined){
            todo.isCompleted = req.body.isCompleted;
        }
        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

// Delete Todo

export const deleteTodo = async (req,res) =>{
    try {
        const {id} = req.params;
        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(400).json({message : "Todo not Found"})
        }
        if(todo.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({message : "Not Authorized to Delete the data !"})
        }
        await todo.deleteOne();
        res.status(200).json({message : "Todo Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

