import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import {
  validateSignUpInput,
  validateLoginInput,
  validateUpdateInput,
} from '../validations/validations';

/**
 * Registers a new user
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - user object
 */
exports.signup = (req, res) => {
  validateSignUpInput(req);

  // Run express validator
  const requestErrors = req.validationErrors();

  // creates a user object
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  if (requestErrors) {
    res.status(400).json({ errors: requestErrors });
  } else {
    User.findOne({ email: req.body.email }).then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({
          error: 'Email already exist',
        });
      }
      user
        .save()
        .then((userDetail) => {
          return res.status(201).json({
            user: {
              userId: userDetail._id,
              firstname: userDetail.firstname,
              lastname: userDetail.lastname,
              email: userDetail.email,
            },
            message: 'Signup successful',
            token: jwt.sign(
              { userId: userDetail._id, email: userDetail.email },
              process.env.SECRET,
              {
                expiresIn: process.env.AUTH_EXPIRY,
              },
            ),
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    });
  }
};

/**
 * Sign in a new user
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return {object} - login details
 */
exports.login = (req, res) => {
  validateLoginInput(req);

  // Run express validator
  const requestErrors = req.validationErrors();
  if (requestErrors) {
    res.status(400).json({ errors: requestErrors });
  } else {
    User.findOne({ email: req.body.email })
      .then((existingUser) => {
        if (existingUser) {
          if (bcrypt.compareSync(req.body.password, existingUser.password)) {
            res.status(200).json({
              user: {
                userId: existingUser._id,
                firstname: existingUser.firstname,
                lastname: existingUser.lastname,
                email: existingUser.email,
              },
              message: 'Log in Successful',
              token: jwt.sign(
                { userId: existingUser._id, email: existingUser.email },
                process.env.SECRET,
                {
                  expiresIn: process.env.AUTH_EXPIRY,
                },
              ),
            });
          } else {
            res.status(401).json({ error: 'Invalid Credential' });
          }
        } else {
          res.status(404).json({ error: 'User not Found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};

/**
 * Allows user update profile
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return {object} - success or failure message
 */
exports.updateProfile = (req, res) => {
  validateUpdateInput(req);
  // Run express validator
  const requestErrors = req.validationErrors();
  if (requestErrors) {
    return res.status(400).json({ errors: requestErrors });
  }
  User.findByIdAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      },
    },
    { new: true },
  )
    .exec((error, user) => {
      if (user) {
        return res.status(200).json({
          user: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          },
          message: 'Your profile was updated successfully',
        });
      }
      return res.status(404).json({ error: 'User not Found' });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
