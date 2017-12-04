import Idea from '../models/Idea';
import {
  validateCreateIdeaInput,
  validateUpdateIdeaInput,
} from '../validations/validations';

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
    userId: req.decoded.userId,
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
              userId: ideaDetail.userId,
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

/**
 * update an idea
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - idea object
 */
exports.updateIdea = (req, res) => {
  validateUpdateIdeaInput(req);

  // Run express validator
  const requestErrors = req.validationErrors();
  const newIdea = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    ideaType: req.body.ideaType,
  };
  if (requestErrors) {
    return res.status(400).json({ errors: requestErrors });
  }
  Idea.findOneAndUpdate(
    {
      $and: [{ _id: req.params._id }, { userId: req.decoded.userId }],
    },
    { $set: newIdea },
    { new: true },
  ).exec((error, idea) => {
    if (idea) {
      return res.status(200).json({
        idea: {
          ideaId: idea._id,
          title: idea.title,
          description: idea.description,
          category: idea.category,
          ideaType: idea.ideaType,
          userId: idea.userId,
        },
        message: 'Idea was updated successfully',
      });
    }
    // return res.status(404).json({
    //   error: 'Idea not Found or You dont have the right to edit this Idea',
    // });
  });
  // .catch((error) => {
  //   return res.status(500).json({ error });
  // });
};

/**
 * delete an idea
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - sucess message
 */
exports.deleteIdea = (req, res) => {
  Idea.remove(
    { $and: [{ _id: req.params._id }, { userId: req.decoded.userId }] },
    (error) => {
      if (error) {
        return res.status(404).json({
          error: 'Idea not Found or You dont have the right to dele this Idea',
        });
      }
      return res.status(200).json({ message: 'Idea successfully deleted' });
    },
  );
};
