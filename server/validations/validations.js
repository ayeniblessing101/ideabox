module.exports = {
  /**
   * Checks if the input in Signup form is Valid
   * @param {Object} request - request.
   *
   * @returns {void}
   */
  validateSignUpInput: (request) => {
    request.checkBody('firstname', 'firstname is required').notEmpty();
    request.checkBody('lastname', 'lastname is required').notEmpty();
    request.checkBody('email', 'email is required').notEmpty();
    request.checkBody('password', 'password is required').notEmpty();
    request.checkBody('firstname', 'Invalid first name').isAlpha();
    request.checkBody('lastname', 'Invalid last name').isAlpha();
    request.checkBody('email', 'Invalid email').isEmail();
    request.sanitize('firstname').escape();
    request.sanitize('firstname').trim();
    request.sanitize('lastname').escape();
    request.sanitize('lastname').trim();
    request
      .checkBody(
        'password',
        'passwords must be at least 8 chars long and contain one number',
      )
      .isLength({ min: 8 })
      .matches(/\d/);
  },
  /**
   * Checks if the input in login form is Valid
   * @param {Object} request - request.
   *
   * @returns {void}
   */
  validateLoginInput: (request) => {
    request.checkBody('email', 'email is required').notEmpty();
    request.checkBody('email', 'Invalid email').isEmail();
    request.checkBody('password', 'password is required').notEmpty();
  },
  /**
   * Checks if the input in update user profile form is Valid
   * @param {Object} request - request.
   *
   * @returns {void}
   */
  validateUpdateProfileInput: (request) => {
    request.checkBody('firstname', 'Invalid first name').isAlpha();
    request.checkBody('lastname', 'Invalid last name').isAlpha();
    request.checkBody('firstname', 'firstname is required').notEmpty();
    request.checkBody('lastname', 'lastname is required').notEmpty();
    request.checkBody('email', 'email is required').notEmpty();
    request.checkBody('email', 'Invalid email').isEmail();
    request.sanitize('firstname').escape();
    request.sanitize('firstname').trim();
    request.sanitize('lastname').escape();
    request.sanitize('lastname').trim();
  },
  /**
   * Checks if the input in email field is Valid
   * @param {Object} request - request.
   *
   * @returns {void}
   */
  validateEmailInput: (request) => {
    request.checkBody('email', 'email is required').notEmpty();
    request.checkBody('email', 'Invalid email').isEmail();
  },
  /**
   * Checks if the input in change password field is Valid
   * @param {Object} request - request.
   *
   * @returns {void}
   */
  validatesaveNewPasswordInput: (request) => {
    request.checkBody('newPassword', 'New password is required').notEmpty();
    request
      .checkBody('confirmNewPassword', 'Please confirm password')
      .notEmpty();
    request.sanitize('newPassword').escape();
    request.sanitize('newPassword').trim();
    request.sanitize('confirmNewPassword').escape();
    request.sanitize('confirmNewPassword').trim();
    request
      .checkBody('confirmNewPassword', 'Password does not match')
      .equals(request.body.newPassword);
  },
  /**
   * Checks if the input in create idea field is Valid
   * @param {Object} request - request.
   *
   * @returns {void}
   */
  validateCreateIdeaInput: (request) => {
    request.checkBody('title', 'Title is required').notEmpty();
    request.checkBody('description', 'Description is required').notEmpty();
    request.checkBody('category', 'Category is required').notEmpty();
    request.sanitize('title').escape();
    request.sanitize('title').trim();
    request.sanitize('description').escape();
    request.sanitize('description').trim();
    request.sanitize('category').escape();
    request.sanitize('category').trim();
  },
  /**
   * Checks if the input(s) in update idea field is Valid
   * @param {Object} request - request.
   *
   * @returns {void}
   */
  validateUpdateIdeaInput: (request) => {
    request.checkBody('title', 'Title is required').notEmpty();
    request.checkBody('description', 'Description is required').notEmpty();
    request.checkBody('category', 'Category is required').notEmpty();
    request.sanitize('title').escape();
    request.sanitize('title').trim();
    request.sanitize('description').escape();
    request.sanitize('description').trim();
    request.sanitize('category').escape();
    request.sanitize('category').trim();
  },
  /**
   * Checks if the comment field is Valid
   * @param {Object} request - request.
   *
   * @returns {void}
   */
  validateCommentInput: (request) => {
    request.checkBody('comment', 'Comment cannot be empty').notEmpty();
    request.sanitize('comment').escape();
    request.sanitize('comment').trim();
  },
};
