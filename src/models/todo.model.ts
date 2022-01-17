import mongoose, { Schema } from "mongoose";

interface IToDoList {
    desc: string,
    done: boolean
}

let toDoListSchema: Schema = new Schema(
    {
        desc: {
            type: String,
            trim: true,
            required: true
        },
        done: {
            type: Boolean,
            default: false
        },
        note: {
            type: Schema.Types.ObjectId, 
            ref: 'Notes', 
            required: true
        } 
    }
);

const ToDoList = mongoose.model<IToDoList>('ToDoList', toDoListSchema);
export default ToDoList;
