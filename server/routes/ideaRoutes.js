import express from 'express';
import ideaController from '../controllers/ideaController';
import verifyToken from '../middleware/verifyToken';

const ideaRoutes = express.Router();

ideaRoutes.post('/idea', verifyToken, ideaController.createAIdea);

export default ideaRoutes;
