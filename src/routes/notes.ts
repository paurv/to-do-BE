import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import _ from 'underscore';

import Notes from '../models/notes.model'
import validateToken from '../middlewares/validate-token';
import { ObjectId } from 'mongodb';

const notesRouter = express();

const getNotes = (req: Request, res: Response, next: NextFunction) => {
    const filter = { owner: req.params.idOwner};
    Notes.find( filter )
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
            });
        });

    // // Notes.find()
    // //     .exec()
    // //     .then( notes => {
    // //         res.status(200).json({
    // //             ok: true,
    // //             data: notes
    // //         });
    // //     }).catch( error => {
    // //         res.status(400).json({
    // //             ok: false,
    // //             error
    // //         })
    // //     })
}
notesRouter.get('/:idOwner', [
    validateToken
], getNotes);

const createNotes = (req: Request, res: Response, next: NextFunction) => {
    const { todolist, title } = _.pick( req.body, ['todolist', 'title']);
    let newToDos = [];
    todolist.forEach((toDo: any) => {
        newToDos.push({...toDo, _id: new ObjectId()})
    })
    const note = new Notes({
        owner: new mongoose.Types.ObjectId(req['uid']),
        title: title,
        todolist: newToDos
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
notesRouter.post('/', [
    validateToken
], createNotes);

const updateTodoList = (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.noteid;
    const { todolist } = _.pick( req.body, ['todolist']);
    let updatedToDos = [];
    todolist.forEach((toDo: any) => {
        updatedToDos.push({...toDo, _id: new ObjectId()})
    });
    Notes.findByIdAndUpdate( noteId, { todolist: updatedToDos }, {new: true, runValidators: true})
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
notesRouter.put('/:noteid', [
    validateToken
], updateTodoList);

const deleteNote = (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.noteid;
    Notes.findByIdAndRemove( noteId )   
        .then( deleteNote => {
            if ( !deleteNote ) {
                return res.status(404).json({
                    ok: false,
                    error: { message: 'Note not found'}
                });
            }
            res.status(200).json({
                ok: true,
                data: `Note ${ deleteNote.title } deleted`
            })
        }).catch( err => {
            res.status(400).json({
                ok: false,
                error: err
            })
        })
}
notesRouter.delete('/:noteid', [
    validateToken
], deleteNote);

export default notesRouter;
