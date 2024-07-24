const { StatusCodes } = require("http-status-codes");
const { SuccessResponse } = require("../utils/common");

async function validator(req, res) {
  SuccessResponse.message = "Successfully Authenticated.";
  return res.status(StatusCodes.OK).json(SuccessResponse);
}

module.exports = {
  validator,
};
