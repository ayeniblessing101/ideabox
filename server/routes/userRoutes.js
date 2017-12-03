import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';

const userRoutes = express.Router();

userRoutes.post('/user/signup', userController.signup);
userRoutes.post('/user/login', userController.login);
userRoutes.put('/user/:_id', verifyToken, userController.updateProfile);
userRoutes.post('/resetpassword', userController.generatePasswordToken);
userRoutes.put('/resetpassword', userController.saveNewPassword);

export default userRoutes;
