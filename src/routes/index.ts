import * as express from 'express';

import authRouter from './auth';
import notesRouter from './notes';
// // import userRouter from './users';

const Routes = express.Router();

Routes.use( '/auth', authRouter )
Routes.use( '/notes', notesRouter );
// // Routes.use( '/user', userRouter );

export default Routes;
