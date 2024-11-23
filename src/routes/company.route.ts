import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { newCompanySchema, updateCompanySchema } from '../models/company.model';

export const companyRoutes = Router();

companyRoutes.get('/companies', asyncHandler(CompanyController.getAll));
companyRoutes.get('/companies/:id', asyncHandler(CompanyController.getUserById));
companyRoutes.post('/companies', celebrate({ [Segments.BODY]: newCompanySchema }), asyncHandler(CompanyController.save));
companyRoutes.put('/companies/:id', celebrate({ [Segments.BODY]: updateCompanySchema }), asyncHandler(CompanyController.update));