"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AppointmentsControlles = _interopRequireDefault(require("../controllers/AppointmentsControlles"));

var _ListAppointmentsControlles = _interopRequireDefault(require("../controllers/ListAppointmentsControlles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use(_ensureAuthenticated.default);
const appointmentsControlles = new _AppointmentsControlles.default();
const listAppointmentsControlles = new _ListAppointmentsControlles.default();
routes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_UserId: _celebrate.Joi.string().required().uuid(),
    toAnotherUser_id: _celebrate.Joi.string().uuid(),
    date: _celebrate.Joi.string().isoDate()
  }
}), appointmentsControlles.create);
routes.get('/me', listAppointmentsControlles.show);
var _default = routes;
exports.default = _default;