import express from 'express';
import userController from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/user/signup', userController.signup);
userRoutes.post('/user/login', userController.login);
userRoutes.put('/user/:_id', userController.updateProfile);

export default userRoutes;
