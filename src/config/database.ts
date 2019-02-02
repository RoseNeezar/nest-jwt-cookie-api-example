export default {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  name: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: process.env.TYPEORM_ENTITIES.split(','),

  // ! Never use in production
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',

  // todo, move entities, migrations path when typeorm config is refactored upstream
  // this is needed for typeorm cli commands
  // https://github.com/typeorm/typeorm/issues/2358
  migrations: process.env.TYPEORM_MIGRATIONS,
  cli: { migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR },

  // https://github.com/typeorm/typeorm/issues/3137
  keepConnectionAlive: true,
};
