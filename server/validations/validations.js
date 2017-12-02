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
  validateUpdateInput: (request) => {
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
   * Checks if the input in email field is Valid
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
};
