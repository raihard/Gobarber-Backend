"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _ListMonthAvailabilityControlles = _interopRequireDefault(require("../controllers/ListMonthAvailabilityControlles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use(_ensureAuthenticated.default);
const listMonthAvailabilityControlles = new _ListMonthAvailabilityControlles.default();
routes.get('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().required().uuid(),
    month: _celebrate.Joi.number().required(),
    year: _celebrate.Joi.number().required()
  }
}), listMonthAvailabilityControlles.show); // routes.get(
//   '/:provider_id/',
//   celebrate({
//     [Segments.PARAMS]: {
//       provider_id: Joi.string().required().uuid(),
//     },
//   }),
//   listMonthAvailabilityControlles.show,
// );

var _default = routes;
exports.default = _default;