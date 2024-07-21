const CrudRepository = require("./crud_repository");
const { user } = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(user);
  }
}

module.exports = UserRepository;
