const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");
const { UserService } = require("../services");

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

const checkAuth = async (req, res, next) => {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    req.user = response;

    next();
  } catch (err) {
    ErrorResponse.message = "Authentication Failed.";
    ErrorResponse.error = err;
    return res.status(err.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  validateAuthRequest,
  checkAuth,
};
