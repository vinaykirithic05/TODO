// backend/models/Todo.js
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500 },
    isCompleted: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

},{timestamps:true})

todoSchema.index({ userId: 1 })

const Todo = mongoose.model('Todo', todoSchema)
export default Todo;