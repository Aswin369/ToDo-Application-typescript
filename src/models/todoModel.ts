import mongoose, { Schema } from "mongoose";
import {ToDo} from "../types/todoTypes"


const todoSchema = new Schema<ToDo>({
    task: {
        type: String,
        required: true
    },
    completed: {
        type:Boolean,
        default: false,
        required: false,
    },
    
})

export const ToDoModel = mongoose.model<ToDo>("ToDo",todoSchema); 