import express from 'express';
import ideaController from '../controllers/ideaController';
import verifyToken from '../middleware/verifyToken';

const ideaRoutes = express.Router();

ideaRoutes.post('/idea', verifyToken, ideaController.createAIdea);
ideaRoutes.put('/idea/:_id', verifyToken, ideaController.updateIdea);
ideaRoutes.delete('/idea/:_id', verifyToken, ideaController.deleteIdea);
ideaRoutes.post('/idea/:_id/comment', verifyToken, ideaController.addComment);
ideaRoutes.get(
  '/idea/:_id/comments',
  verifyToken,
  ideaController.getIdeaComments,
);
ideaRoutes.get('/ideas/search', verifyToken, ideaController.searchIdeas);
ideaRoutes.get('/user/ideas', verifyToken, ideaController.getAllIdeasByAUser);
ideaRoutes.get('/ideas', verifyToken, ideaController.getAllIdeas);
ideaRoutes.get('/idea/:_id', verifyToken, ideaController.getIdeaById);
ideaRoutes.get(
  '/idea/category/:category',
  verifyToken,
  ideaController.getIdeasByCategory,
);

export default ideaRoutes;
