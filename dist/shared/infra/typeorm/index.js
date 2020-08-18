"use strict";

var _typeorm = require("typeorm");

(0, _typeorm.createConnections)([{
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mrktplc@1',
  database: 'gostack_gobarber',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations'
  }
}, {
  name: 'mongo',
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  useUnifiedTopology: true,
  database: 'gobarber',
  entities: ['./src/modules/**/infra/typeorm/schemas/*.ts']
}]);