"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _UserProfileController = _interopRequireDefault(require("../controllers/UserProfileController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
const userProfileController = new _UserProfileController.default(); //  name, email, oldpassword, password

routes.get('/', _ensureAuthenticated.default, userProfileController.show);
routes.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().required().email(),
    password: _celebrate.Joi.string(),
    password_confirmation: _celebrate.Joi.string().valid(_celebrate.Joi.ref('password')),
    oldpassword: _celebrate.Joi.string()
  }
}), _ensureAuthenticated.default, userProfileController.update);
var _default = routes;
exports.default = _default;