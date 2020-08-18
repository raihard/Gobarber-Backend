"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _UpdateProfileUserServices = _interopRequireDefault(require("../../../services/UpdateProfileUserServices"));

var _ShowProfileUserServices = _interopRequireDefault(require("../../../services/ShowProfileUserServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// index, show, create, update, delete
class UserProfileController {
  async show(request, response) {
    const user_id = request.user.id;

    const showProfileUserServices = _tsyringe.container.resolve(_ShowProfileUserServices.default);

    const user = await showProfileUserServices.execute(user_id);
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async update(request, response) {
    const user_id = request.user.id;
    const {
      name,
      email,
      oldpassword,
      password
    } = request.body;

    const UpdateProfileUser = _tsyringe.container.resolve(_UpdateProfileUserServices.default);

    const user = await UpdateProfileUser.execute({
      user_id,
      name,
      email,
      oldpassword,
      password
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UserProfileController;