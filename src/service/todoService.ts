import { ToDoModel } from "../models/todoModel";
import { HttpStatus } from "../constants/statusCode";
import { ToDo } from "../types/todoTypes";
import { createHttpsError } from "../utils/http-error.util";
import { ResponseMessages } from "../constants/response-messages.contants";

export class TodoSerivice {
  async getTodo(): Promise<ToDo[]> {
    return await ToDoModel.find();
  }

  async addTodo(task: ToDo): Promise<void> {
    await ToDoModel.create({
      task: task,
    });
  }

  async taskCompleted(id: string, completed: boolean): Promise<void> {
    let macthed = await ToDoModel.updateOne(
      { _id: id },
      { completed: completed }
    );
    if (macthed.matchedCount == 0) {
      throw createHttpsError(HttpStatus.NOT_FOUND, ResponseMessages.NOT_FOUND);
    }
  }

  async deleteTask(taskId: string): Promise<void> {
      const res = await ToDoModel.deleteOne({ _id: taskId });
      if (res.deletedCount === 0) {
        throw createHttpsError(HttpStatus.NOT_FOUND, ResponseMessages.NOT_FOUND);
      }
  }

  async taskNotCompleted(id:string):Promise<void> {
    const res = await ToDoModel.updateOne({_id:id},{completed: false})
    if(res.modifiedCount === 0){
        throw createHttpsError(HttpStatus.NOT_FOUND,ResponseMessages.NOT_FOUND)
    }
  }

}
