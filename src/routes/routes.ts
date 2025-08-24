import express from "express"
import {TodoController} from "../controllers/todoController";
import {TodoSerivice} from "../service/todoService";
const router = express.Router()

const todoSerivice =  new TodoSerivice()
const todoController = new TodoController(todoSerivice)

router.get("/",todoController.getTodo.bind(todoController))
router.post("/task",todoController.addTodo);
router.put("/completed",todoController.taskCompleted)
router.delete("/delete",todoController.deleteTask)
export default router;