"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderServices = _interopRequireDefault(require("../../../services/ListProviderServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListProviversControlles {
  async show(request, response) {
    const user_id = request.user.id;

    const listProvider = _tsyringe.container.resolve(_ListProviderServices.default);

    const providers = await listProvider.execute({
      except_user_id: user_id
    });
    return response.json(providers);
  }

}

exports.default = ListProviversControlles;