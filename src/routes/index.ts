import express from 'express';
import { usersRoutes } from './users.route';
import { authRoutes } from './auth.route';
import { companiesRoutes } from './companies.route';
import { categoriesRoutes } from './categories.route';

export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(authRoutes);
    app.use(usersRoutes);
    app.use(companiesRoutes);
    app.use(categoriesRoutes);
}