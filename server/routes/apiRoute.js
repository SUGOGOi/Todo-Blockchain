import express from 'express';
import { createTask, viewAllTask, viewTask } from '../controllers/apiController.js';

const app = express.Router();

app.get("/view-task/:taskID", viewTask)
app.get("/view-all-task", viewAllTask)
app.post('/create-task', createTask)

export default app;