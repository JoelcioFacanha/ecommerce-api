import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthContoller } from '../controllers/auth.controller';

export const authRoutes = Router()

authRoutes.post("/auth/login", asyncHandler(AuthContoller.login))