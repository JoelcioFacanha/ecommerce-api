import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { newProductSchema, updateProductSchema } from '../models/product.model.js';
import { ProductsController } from '../controllers/products.controller.js';

export const productsRoutes = Router();

productsRoutes.get('/products', asyncHandler(ProductsController.getAll));
productsRoutes.get('/products/:id', asyncHandler(ProductsController.getById));
productsRoutes.post('/products', celebrate({ [Segments.BODY]: newProductSchema }), asyncHandler(ProductsController.save));
productsRoutes.put('/products/:id', celebrate({ [Segments.BODY]: updateProductSchema }), asyncHandler(ProductsController.update));
productsRoutes.delete('/products/:id', asyncHandler(ProductsController.delete));