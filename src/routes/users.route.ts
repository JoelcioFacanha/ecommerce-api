import express from 'express';
import { UserController } from '../controllers/users.controller';

export const userRoutes = express.Router();

userRoutes.get('/users', UserController.getAll);
userRoutes.get('/users/:id', UserController.getUserById);
userRoutes.post('/users', UserController.save);
userRoutes.put('/users/:id', UserController.update);
userRoutes.delete('/users/:id', UserController.delete);