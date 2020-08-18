"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _RecovePasswordController = _interopRequireDefault(require("../controllers/RecovePasswordController"));

var _ResetPasswordController = _interopRequireDefault(require("../controllers/ResetPasswordController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
const recovePasswordController = new _RecovePasswordController.default();
const resetPasswordController = new _ResetPasswordController.default();
routes.post('/forgot', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().required().email()
  }
}), recovePasswordController.create);
routes.post('/reset', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    password: _celebrate.Joi.string().required(),
    password_confirmation: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref('password')),
    token: _celebrate.Joi.string().required().uuid()
  }
}), resetPasswordController.create);
var _default = routes;
exports.default = _default;