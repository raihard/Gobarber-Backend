"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _ListProviversControlles = _interopRequireDefault(require("../controllers/ListProviversControlles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use(_ensureAuthenticated.default);
const proviversControlles = new _ListProviversControlles.default();
routes.get('/', // celebrate({
//   [Segments.QUERY]: {
//     provider_id: Joi.string().required().uuid(),
//   },
// }),
proviversControlles.show);
var _default = routes;
exports.default = _default;