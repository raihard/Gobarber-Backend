"use strict";

var _tsyringe = require("tsyringe");

var _RedisCache = _interopRequireDefault(require("./implaments/RedisCache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('Caches', _RedisCache.default);