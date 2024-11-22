import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthContoller } from '../controllers/auth.controller';
import { celebrate, Segments } from 'celebrate';
import { authLoginSchema, authRecoverySchema } from '../models/user.model';

export const authRoutes = Router()

authRoutes.post("/auth/login", celebrate({ [Segments.BODY]: authLoginSchema }), asyncHandler(AuthContoller.login));
authRoutes.post("/auth/recovery", celebrate({ [Segments.BODY]: authRecoverySchema }), asyncHandler(AuthContoller.recovery));