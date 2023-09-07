import express from 'express';
import { createUser } from '../../controllers/users/createUserController.js';

const createUserRouter = express.Router();

createUserRouter.post('/', createUser);

export default createUserRouter;
