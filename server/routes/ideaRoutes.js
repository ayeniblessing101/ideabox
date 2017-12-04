import express from 'express';
import ideaController from '../controllers/ideaController';
import verifyToken from '../middleware/verifyToken';

const ideaRoutes = express.Router();

ideaRoutes.post('/idea', verifyToken, ideaController.createAIdea);
ideaRoutes.put('/idea/:_id', verifyToken, ideaController.updateIdea);
ideaRoutes.delete('/idea/:_id', verifyToken, ideaController.deleteIdea);

export default ideaRoutes;
