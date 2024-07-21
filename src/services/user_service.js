const { UserRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");
const { Auth } = require("../utils/common");

const userRepo = new UserRepository();

async function createUser(data) {
  try {
    const user = await userRepo.create(data);
    return user;
  } catch (err) {
    if (
      err.name == "SequelizeUniqueConstraintError" ||
      err.name == "SequelizeValidationError"
    ) {
      let explanation = [];
      err.errors.forEach((item) => {
        explanation.push(item.message);
      });

      throw new AppError(explanation.join(", "), StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot Create A New User Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(
        "No User Found For The Given Email",
        StatusCodes.NOT_FOUND
      );
    }

    const passwordMatch = Auth.checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new AppError("Invalid Password", StatusCodes.BAD_REQUEST);
    }

    const jwt = Auth.createToken({
      id: user.id,
      email: user.email,
    });
    return jwt;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      "Something Went Wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("Missing JWT Token", StatusCodes.BAD_REQUEST);
    }

    const response = Auth.verifyToken(token);
    const user = await userRepo.get(response.id);
    if (!user) {
      throw new AppError("User Not Found", StatusCodes.NOT_FOUND);
    }
    return user.id;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    if (err.name == "JsonWebTokenError") {
      throw new AppError("Invalid JWT Token", StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Something Went Wrong While Authentication",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createUser,
  signin,
  isAuthenticated,
};
