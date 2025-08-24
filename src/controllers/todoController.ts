import { Response, Request, NextFunction } from "express";
import { TodoSerivice } from "../service/todoService";
import { HttpStatus } from "../constants/statusCode";
import { createHttpsError } from "../utils/http-error.util";
import { successResponse } from "../utils/response.util";
import {ResponseMessages} from "../constants/response-messages.contants"


export class TodoController {
  constructor(private todoSerivice: TodoSerivice) {}

  getTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await this.todoSerivice.getTodo();
      res.render("index", {
        todo,
      });
    } catch (error) {
        console.log("error", error);
      next(error);
    }
  };

  addTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { task } = req.body;
      if (!task) {
        throw createHttpsError(HttpStatus.BAD_REQUEST, ResponseMessages.BAD_REQUEST)
      }
      await this.todoSerivice.addTodo(task);
      successResponse(res,HttpStatus.OK,ResponseMessages.CREATED)
    } catch (error) {
      next(error);
    }
  };

  taskCompleted = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, completed } = req.body;
      if (!id || completed == undefined) {
        throw createHttpsError(HttpStatus.BAD_REQUEST, ResponseMessages.BAD_REQUEST)
      }
      await this.todoSerivice.taskCompleted(id, completed);
      successResponse(res,HttpStatus.OK, ResponseMessages.UPDATED)
    } catch (err) {
      next(err);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.body;
      if (!taskId) {
        throw createHttpsError(HttpStatus.BAD_REQUEST, ResponseMessages.NOT_FOUND)
      } else {
        await this.todoSerivice.deleteTask(taskId);
        successResponse(res,HttpStatus.CREATED,ResponseMessages.DELETED)
      }
    } catch (error) {
      next(error);
    }
  };

  taskNotCompleted = async(req:Request, res: Response, next: NextFunction)=> {
    try {
        let {id} = req.body
        if(!id) createHttpsError(HttpStatus.BAD_REQUEST, ResponseMessages.BAD_REQUEST)
        await this.todoSerivice.taskNotCompleted(id)
        successResponse(res,HttpStatus.OK,ResponseMessages.CREATED)
    } catch (error) {
        next(error)
    }
  }

}
