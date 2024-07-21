const { UserRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

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

module.exports = {
  createUser,
};
