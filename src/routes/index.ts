import express from 'express';
import { usersRoutes } from './users.route.js';
import { authRoutes } from './auth.route.js';
import { companiesRoutes } from './companies.route.js';
import { categoriesRoutes } from './categories.route.js';
import { productsRoutes } from './products.route.js';

export const routes = (app: express.Express) => {
    app.use(express.json({ limit: "5mb" }));
    app.use(authRoutes);
    app.use(usersRoutes);
    app.use(companiesRoutes);
    app.use(categoriesRoutes);
    app.use(productsRoutes);
}