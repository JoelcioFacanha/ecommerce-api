import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { PaymentMethodController } from '../controllers/payment-method.controller.js';
import { newPaymentSchema, updatePaymentSchema } from '../models/payment.model.js';

export const paymentMethodsRoutes = Router();

paymentMethodsRoutes.get('/payment-methods', asyncHandler(PaymentMethodController.getAll));
paymentMethodsRoutes.get('/payment-methods/:id', asyncHandler(PaymentMethodController.getById));
paymentMethodsRoutes.post('/payment-methods', celebrate({ [Segments.BODY]: newPaymentSchema }), asyncHandler(PaymentMethodController.save));
paymentMethodsRoutes.put('/payment-methods/:id', celebrate({ [Segments.BODY]: updatePaymentSchema }), asyncHandler(PaymentMethodController.update));
paymentMethodsRoutes.delete('/payment-methods/:id', asyncHandler(PaymentMethodController.delete));