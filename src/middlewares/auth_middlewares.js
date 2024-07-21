const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

const validateAuthRequest = (req, res, next) => {
  if (!req.body.email) {
    ErrorResponse.message = "Something Went Wrong While Authenticating User.";
    ErrorResponse.error = new AppError(
      "Email Not Found In The Incoming Request",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something Went Wrong While Authenticating User.";
    ErrorResponse.error = new AppError(
      "Password Not Found In The Incoming Request",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
};

module.exports = {
  validateAuthRequest,
};
