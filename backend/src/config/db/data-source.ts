import 'dotenv/config';
import { DataSource } from 'typeorm';

const isCompiled = __dirname.includes('dist');
const rootDir = isCompiled ? 'dist' : 'src';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'postgres',
  entities: [`${rootDir}/**/*.entity.{ts,js}`],
  migrations: [`${rootDir}/config/db/migrations/*.{ts,js}`],
});
