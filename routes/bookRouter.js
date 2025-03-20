import { addBook,deleteBook,getAllBook } from "../controllers/bookController.js"; 
import express from 'express';


const router = express.Router();


//router.post('/admin/add', addBook);
router.post('/add', addBook);
router.get('/all', getAllBook);
router.delete('/delete/:id', deleteBook);

export default router;