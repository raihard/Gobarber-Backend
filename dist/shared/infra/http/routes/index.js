"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));

var _profile = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/profile.routes"));

var _appointments = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/appointments.routes"));

var _providerMonthAvailability = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/providerMonthAvailability.routes"));

var _providerDayAvailability = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/providerDayAvailability.routes"));

var _providers = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/providers.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.get('/', (req, res) => {
  res.status(204).json();
});
routes.use('/sessions', _sessions.default);
routes.use('/users', _users.default);
routes.use('/profile', _profile.default);
routes.use('/password', _password.default);
routes.use('/providers', _providers.default);
routes.use('/:provider_id/MonthAvailability', _providerMonthAvailability.default);
routes.use('/:provider_id/DayAvailability', _providerDayAvailability.default);
routes.use('/appointments', _appointments.default);
var _default = routes;
exports.default = _default;