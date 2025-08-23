import { threadCpuUsage } from "process";
import {ToDoModel} from "../models/todoModel"
import {ToDo} from "../types/todoTypes"

export class TodoSerivice {
    async getTodo(): Promise<ToDo[]> {
        return await ToDoModel.find();
    }

    async addTodo(task:ToDo): Promise<void> {
    console.log("task from service top", task)
     try{
         await ToDoModel.create({
             task:task
      })
      console.log("task from service bottom", task)
     }catch(err){
        console.error("Error found in addTodo",err)
     }
    }

    async taskCompleted(id:string, completed:boolean):Promise<void> {
        try {
            let macthed = await ToDoModel.updateOne({_id:id},{completed:completed});
            if(macthed.matchedCount == 0){
                 throw new Error("task not found")
            }
        } catch (error) {
            throw new Error("Server error")
        }
    }

    async deleteTask(taskId:string):Promise<void>{
        try{
            const res = await ToDoModel.deleteOne({_id:taskId})
            if(res.deletedCount === 0){
                throw new Error("Deleteing not completed")
            }
        }catch(error){
            throw new Error("Sever error")
        }
    }

}

