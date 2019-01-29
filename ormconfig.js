require('dotenv').config();

module.exports = {
  logging: ['warn', 'error', 'schema'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  cli: { migrationsDir: "src/migrations" }
};
