import Idea from '../models/Idea';
import Comment from '../models/Comment';
import {
  validateCreateIdeaInput,
  validateUpdateIdeaInput,
  validateCommentInput,
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
    user: req.decoded.userId,
    modified: false,
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
              userId: ideaDetail.user,
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
    modified: true,
  };
  if (requestErrors) {
    return res.status(400).json({ errors: requestErrors });
  }
  Idea.findOneAndUpdate(
    { _id: req.params._id, user: req.decoded.userId },
    { $set: newIdea },
    { new: true },
  )
    .then((idea) => {
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
      return res.status(404).json({
        error: 'Idea not Found or You dont have the right to edit this Idea',
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

/**
 * delete an idea
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - success or failure message
 */
exports.deleteIdea = (req, res) => {
  Idea.remove({
    _id: req.params._id,
    user: req.decoded.userId,
  })
    .then((idea) => {
      if (idea.result.n === 1) {
        res.status(200).json({ message: 'Idea successfully deleted' });
      } else {
        return res.status(404).json({
          error: 'Idea not Found',
        });
      }
    })
    .catch(() => res.status(500).json({ message: 'Internal Server error' }));
};

/**
 * add comment to a public idea
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - success or failure message
 */
exports.addComment = (req, res) => {
  validateCommentInput(req);
  // Run express validator
  const requestErrors = req.validationErrors();

  Idea.findOne({ _id: req.params._id, ideaType: 'Public' })
    .then((idea) => {
      if (idea) {
        if (requestErrors) {
          return res.status(400).json({ errors: requestErrors });
        }
        const comment = new Comment({
          ideaId: idea._id,
          commentBy: req.decoded.userId,
          comment: req.body.comment,
        });
        comment
          .save()
          .then((newComment) => {
            res.status(201).json({
              comment: {
                ideaId: newComment.ideaId,
                commentBy: newComment.ideaId,
                comment: req.body.comment,
              },
              message: 'Comment added successfully',
            });
          })
          .catch((e) => {
            return res
              .status(500)
              .json({ message: 'Internal Server Error', e });
          });
      } else {
        return res.status(404).json({ message: 'Idea not found' });
      }
    })
    .catch((e) => {
      return res.status(500).json({ message: 'Internal Server Error', e });
    });
};
/**
 * search for ideas
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - success or failure message
 */
exports.searchIdeas = (req, res) => {
  Idea.find(
    {
      $text: {
        $search: req.query.q,
      },
    },
    {
      score: { $meta: 'textScore' },
    },
  )
    .sort({
      score: { $meta: 'textScore' },
    })
    .limit(5)
    .exec()
    .then((ideas) => {
      res.status(200).json({ ideas });
    });
};

/**
 * get all ideas by a user
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - success or failure message
 */
exports.getAllIdeasByAUser = (req, res) => {
  Idea.find({ user: req.decoded.userId })
    .then((response) => {
      if (response) {
        res.status(200).json({
          ideas: response,
        });
      } else {
        res.status(404).json({ error: 'No Ideas Found' });
      }
    })
    .catch((e) => {
      return res.status(500).json({ message: 'Internal Server Error', e });
    });
};

/**
 * get all ideas
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - success or failure message
 */
exports.getAllIdeas = (req, res) => {
  Idea.find({})
    .populate('user')
    .then((response) => {
      if (response) {
        res.status(200).json({
          ideas: response,
        });
      } else {
        res.status(404).json({ error: 'No Ideas Found' });
      }
    })
    .catch((e) => {
      return res.status(500).json({ message: 'Internal Server Error', e });
    });
};

/**
 * get idea by id
 *
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - success or failure message
 */
exports.getIdeaById = (req, res) => {
  Idea.findById(req.params._id)
    .then((response) => {
      if (response) {
        res.status(200).json({
          idea: response,
        });
      } else {
        res.status(404).json({ error: 'Idea not Found' });
      }
    })
    .catch((e) => {
      return res.status(500).json({ message: 'Internal Server Error', e });
    });
};
