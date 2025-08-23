import { Response, Request } from "express";
import {TodoSerivice} from "../service/todoService"
import {HttpStatus} from "../types/statusCode"

export class TodoController {

    constructor(private todoSerivice: TodoSerivice) {}

    getTodo = async (req: Request, res: Response) => {
        const todo = await this.todoSerivice.getTodo()
        // console.log("this is my todo",todo)
        res.render("index",{
            todo
        })
    }

    addTodo = async (req:Request, res: Response) =>{
        // console.log("fasdfdsg",req.body)
          const {task} = req.body;
          if(!task){
              res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: "Task is requierd"
              })
        }
        await this.todoSerivice.addTodo(task)
        res.status(HttpStatus.CREATED).json({
            success: true,
            message: "Task added successfuly"
        })
    }

    taskCompleted = async (req:Request, res:Response) => {
        try{
            console.log("Thisis body",req.body)
        const {id, completed} = req.body
        if(!id || completed == undefined){
           return res.status(HttpStatus.BAD_REQUEST).json({
                success:false,
                message:"Task completing have issue"
            })
        }
        await this.todoSerivice.taskCompleted(id,completed)
        res.status(HttpStatus.OK).json({
            success:true,
            message: "Task completed"
        })
        }catch(err:any){
            console.error("Something went wrond", err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: err.message || "Server error"
            })
        }
    }

    deleteTask = async (req:Request, res: Response)=>{
        console.log("THis is delete taske",req.body)
        try {
            const {taskId} = req.body;
            if(!taskId){
                res.status(HttpStatus.BAD_REQUEST).json({
                    succuss: false,
                    message: "Task id is null"
                })
            }else{
                await this.todoSerivice.deleteTask(taskId)
                res.status(HttpStatus.OK).json({
                    success: true,
                    message: "Deleted  successfully"
                })
            }
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                succuss: false,
                message: error.message ||  "while Error from deleting"
            })
        }
    }

}

