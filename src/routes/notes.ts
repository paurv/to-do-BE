import express, { Request, Response, NextFunction } from 'express';
import Notes, { INotes } from '../models/notes.model'
import _ from 'underscore';
import mongoose from 'mongoose';

const notesRouter = express();

const getNotes = (req: Request, res: Response, next: NextFunction) => {
    Notes.find()
        .exec()
        .then( notes => {
            res.status(200).json({
                ok: true,
                data: notes
            });
        }).catch( error => {
            res.status(400).json({
                ok: false,
                error
            })
        })
}
notesRouter.get('/', getNotes);

const createNotes = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const note = new Notes({
        owner: mongoose.Schema.Types.ObjectId,
        title: body.title,
        todolist: body.todolist
    });
    note.save()
        .then( resp => {
            res.status(200).json({
                ok: true,
                data: resp
            })
        }).catch( err => {
            res.status(400).json({
                ok: false,
                error: err
            })
        });
}
notesRouter.post('/', createNotes);


const updateNotesList = (req: Request, res: Response, next: NextFunction) => {
    const id = req.body._id;
    const data = _.pick( req.body, ['todolist']);

    Notes.findByIdAndUpdate( id, data, {new: true, runValidators: true})
        .then( updatedList => {
            res.status(200).json({
                ok: true,
                data: updatedList
            })
        }).catch( err => {
            res.status(400).json({
                ok: false,
                error: err
            })
        })
}
notesRouter.put('/', updateNotesList);

// delete Notes
const deleteNote = (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    Notes.findByIdAndRemove( id )   
        .then( deleteNote => {
            if ( !deleteNote ) {
                return res.status(404).json({
                    ok: false,
                    error: { message: 'Note not found'}
                });
            }
            res.status(200).json({
                ok: true,
                data: deleteNote
            })
        }).catch( err => {
            res.status(400).json({
                ok: false,
                error: err
            })
        })
}
notesRouter.delete('/', deleteNote);

// module.exports = app;
export default notesRouter;