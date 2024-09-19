// Imports
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig: any = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_DATABASE,
  logging: false,
};
