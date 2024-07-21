const CrudRepository = require("./crud_repository");
const { user } = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(user);
  }

  async getUserByEmail(email) {
    const response = await user.findOne({
      where: {
        email: email,
      },
    });
    return response;
  }
}

module.exports = UserRepository;
