import 'dotenv/config';
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from './database/typeorm.config';

export default new DataSource(buildDataSourceOptions(process.env));
