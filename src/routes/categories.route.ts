import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { newCategorySchema, updateCategorySchema } from '../models/category.model';
import { CategoriesController } from '../controllers/categories.controller';

export const categoriesRoutes = Router();

categoriesRoutes.get('/categories', asyncHandler(CategoriesController.getAll));
categoriesRoutes.get('/categories/:id', asyncHandler(CategoriesController.getById));
categoriesRoutes.post('/categories', celebrate({ [Segments.BODY]: newCategorySchema }), asyncHandler(CategoriesController.save));
categoriesRoutes.put('/categories/:id', celebrate({ [Segments.BODY]: updateCategorySchema }), asyncHandler(CategoriesController.update));
categoriesRoutes.delete('/categories/:id', asyncHandler(CategoriesController.delete));