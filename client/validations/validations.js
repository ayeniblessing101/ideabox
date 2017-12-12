import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

module.exports = {
  /**
   * Checks if the input in Signup form is Valid
   * @param {Object} inputData - inputData.
   *
   * @returns {void}
   */
  validateSignUpInput: (inputData) => {
    const errors = {};

    if (Validator.isEmpty(inputData.firstname)) {
      errors.firstname = 'This field required';
    }
    if (Validator.isEmpty(inputData.lastname)) {
      errors.lastname = 'This field required';
    }
    if (Validator.isEmpty(inputData.email)) {
      errors.email = 'This field required';
    }
    if (!Validator.isEmail(inputData.email)) {
      errors.email = 'Email is not valid';
    }
    if (Validator.isEmpty(inputData.password)) {
      errors.password = 'This field required';
    }
    if (Validator.isEmpty(inputData.confirmPassword)) {
      errors.confirmPassword = 'This field required';
    }
    if (!Validator.equals(inputData.password, inputData.confirmPassword)) {
      errors.confirmPassword = 'Password must Match';
    }
    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
  /**
   * Checks if the input in login form is Valid
   * @param {Object} inputData - request.
   *
   * @returns {void}
   */
  validateLoginInput: (inputData) => {
    const errors = {};
    if (Validator.isEmpty(inputData.email)) {
      errors.email = 'This field required';
    }
    if (!Validator.isEmail(inputData.email)) {
      errors.email = 'Email is not valid';
    }
    if (Validator.isEmpty(inputData.password)) {
      errors.password = 'This field required';
    }
    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
  /**
   * Checks if the input in update user profile form is Valid
   * @param {Object} inputData - inputData.
   *
   * @returns {void}
   */
  validateUpdateProfileInput: (inputData) => {
    const errors = {};

    if (inputData.firstname && !Validator.isAlpha(inputData.firstname)) {
      errors.firstname = 'Invalid first name';
    }
    if (inputData.lastname && !Validator.isAlpha(inputData.lastname)) {
      errors.lastname = 'Invalid lsst name';
    }
    if (Validator.isEmpty(inputData.email)) {
      errors.email = 'This field required';
    }
    if (Validator.isEmpty(inputData.firstname)) {
      errors.firstname = 'This field required';
    }
    if (Validator.isEmpty(inputData.lastname)) {
      errors.lastname = 'This field required';
    }
    if (Validator.isEmpty(inputData.email)) {
      errors.email = 'This field required';
    }
    if (!Validator.isEmail(inputData.email)) {
      errors.email = 'Email is not valid';
    }
    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
  // /**
  //  * Checks if the input in email field is Valid
  //  * @param {Object} request - request.
  //  *
  //  * @returns {void}
  //  */
  // validateEmailInput: (request) => {
  //   request.checkBody('email', 'email is required').notEmpty();
  //   request.checkBody('email', 'Invalid email').isEmail();
  // },
  // /**
  //  * Checks if the input in change password field is Valid
  //  * @param {Object} request - request.
  //  *
  //  * @returns {void}
  //  */
  // validatesaveNewPasswordInput: (request) => {
  //   request.checkBody('newPassword', 'New password is required').notEmpty();
  //   request
  //     .checkBody('confirmNewPassword', 'Please confirm password')
  //     .notEmpty();
  //   request.sanitize('newPassword').escape();
  //   request.sanitize('newPassword').trim();
  //   request.sanitize('confirmNewPassword').escape();
  //   request.sanitize('confirmNewPassword').trim();
  //   request
  //     .checkBody('confirmNewPassword', 'Password does not match')
  //     .equals(request.body.newPassword);
  // },
  /**
   * Checks if the input in create idea field is Valid
   * @param {Object} inputData - inputData.
   *
   * @returns {void}
   */
  validateCreateIdeaInput: (inputData) => {
    const errors = {};
    if (Validator.isEmpty(inputData.title)) {
      errors.title = 'This field required';
    }
    if (Validator.isEmpty(inputData.description)) {
      errors.description = 'This field required';
    }
    // if (Validator.isEmpty(inputData.category)) {
    //   errors.category = 'This field required';
    // }
    // if (Validator.isEmpty(inputData.ideaType)) {
    //   errors.ideaType = 'This field required';
    // }
    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
  // /**
  //  * Checks if the input(s) in update idea field is Valid
  //  * @param {Object} request - request.
  //  *
  //  * @returns {void}
  //  */
  // validateUpdateIdeaInput: (request) => {
  //   request.checkBody('title', 'Title is required').notEmpty();
  //   request.checkBody('description', 'Description is required').notEmpty();
  //   request.checkBody('category', 'Category is required').notEmpty();
  //   request.sanitize('title').escape();
  //   request.sanitize('title').trim();
  //   request.sanitize('description').escape();
  //   request.sanitize('description').trim();
  //   request.sanitize('category').escape();
  //   request.sanitize('category').trim();
  // },
  // /**
  //  * Checks if the comment field is Valid
  //  * @param {Object} request - request.
  //  *
  //  * @returns {void}
  //  */
  // validateCommentInput: (request) => {
  //   request.checkBody('comment', 'Comment cannot be empty').notEmpty();
  //   request.sanitize('comment').escape();
  //   request.sanitize('comment').trim();
  // },
};
