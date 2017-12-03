import Idea from '../models/Idea';
import { validateCreateIdeaInput } from '../validations/validations';

/**
 * creates a new idea
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - user object
 */
exports.createAIdea = (req, res) => {
  validateCreateIdeaInput(req);

  // Run express validator
  const requestErrors = req.validationErrors();
  const newIdea = new Idea({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    ideaType: req.body.ideaType,
    userId: req.decoded.id,
  });
  if (requestErrors) {
    res.status(400).json({ errors: requestErrors });
  } else {
    Idea.findOne({ title: req.body.title })
      .then((existingTitle) => {
        if (existingTitle) {
          return res.status(409).json({
            error: 'Idea already exist',
          });
        }
        newIdea.save().then((ideaDetail) => {
          return res.status(201).json({
            newIdea: {
              ideaId: ideaDetail._id,
              title: ideaDetail.title,
              description: ideaDetail.description,
              type: ideaDetail.ideaType,
            },
            message: 'Idea created successfully',
          });
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }
};
