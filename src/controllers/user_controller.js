const { UserService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createUser(req, res) {
  try {
    const user = await UserService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.message = "Successfully Created An User.";
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (err) {
    ErrorResponse.error = err;
    ErrorResponse.message = "Something Went Wrong While Creating An User.";
    return res.status(err.statusCode).json(ErrorResponse);
  }
}

async function signin(req, res) {
  try {
    const user = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.message = "Successfully SignIn.";
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (err) {
    ErrorResponse.error = err;
    ErrorResponse.message = "Something Went Wrong While SignIn.";
    return res.status(err.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createUser,
  signin,
};
