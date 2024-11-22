import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { newUserSchema, updateUserSchema } from '../models/user.model';

export const companyRoutes = Router();

companyRoutes.get('/company', asyncHandler(CompanyController.getAll));
companyRoutes.get('/company/:id', asyncHandler(CompanyController.getUserById));
companyRoutes.post('/company', celebrate({ [Segments.BODY]: newUserSchema }), asyncHandler(CompanyController.save));
companyRoutes.put('/company/:id', celebrate({ [Segments.BODY]: updateUserSchema }), asyncHandler(CompanyController.update));