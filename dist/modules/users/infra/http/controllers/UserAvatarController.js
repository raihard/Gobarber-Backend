"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _UploadAvatarUserServices = _interopRequireDefault(require("../../../services/UploadAvatarUserServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// index, show, create, update, delete
class UsersController {
  async update(request, response) {
    const {
      filename
    } = request.file;

    const uploadAvatarUser = _tsyringe.container.resolve(_UploadAvatarUserServices.default);

    const user = await uploadAvatarUser.execute({
      user_id: request.user.id,
      avatar_filename: filename
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UsersController;