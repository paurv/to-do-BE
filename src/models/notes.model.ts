import mongoose, { Schema } from "mongoose";

export interface INotes {
    title: string,
    todolist: Array<INotesList>
}

interface INotesList {
    desc: string,
    done: boolean
}

let notesSchema: Schema = new Schema(
    {
        owner: { type: mongoose.Types.ObjectId, required: true, unique: true },
        title: { type: String, trim: true, required: true },
        todolist: [{
            desc: {type: String, trim: true },
            done: Boolean
        }]
    },
    {
        versionKey: false
    }
);

const Notes = mongoose.model<INotes>('Notes', notesSchema);
export default Notes;
