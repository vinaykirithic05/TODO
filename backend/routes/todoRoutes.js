// backend/routes/todoRoutes.js

import express from 'express';
import {createTodo ,getTodo,updateTodo,deleteTodo} from '../controllers/todoController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/',protect,createTodo);
router.get('/',protect,getTodo)
router.put('/:id',protect,updateTodo)
router.delete('/:id',protect,deleteTodo)

export default router;
