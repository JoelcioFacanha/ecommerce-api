import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { newUserSchema, updateUserSchema } from '../models/user.model';

export const usersRoutes = Router();

usersRoutes.get('/users', asyncHandler(UsersController.getAll));
usersRoutes.get('/users/:id', asyncHandler(UsersController.getUserById));
usersRoutes.post('/users', celebrate({ [Segments.BODY]: newUserSchema }), asyncHandler(UsersController.save));
usersRoutes.put('/users/:id', celebrate({ [Segments.BODY]: updateUserSchema }), asyncHandler(UsersController.update));
usersRoutes.delete('/users/:id', asyncHandler(UsersController.delete));