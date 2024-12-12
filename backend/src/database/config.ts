import { DataSourceOptions } from 'typeorm'
import { getEnv } from '../helpers/env-helpers'
import path from 'path'

const config: DataSourceOptions = {
  type: getEnv(
    'DB_TYPE',
    'mysql' as 'mysql' | 'mariadb' | 'postgres' | 'sqlite' | 'mssql' | 'sap' | 'oracle' | 'mongodb'
  ),
  host: getEnv('DB_HOST', 'localhost'),
  port: getEnv('DB_PORT', 3306),
  username: getEnv('DB_USERNAME', 'root'),
  password: getEnv('DB_PASSWORD', 'password'),
  database: getEnv('DB_NAME', 'job_hunt_db'),
  synchronize: true, // development mode,
  entities: [path.dirname(__dirname) + '/entities/**/*.ts'],
  logging: ['error']
}

export default config
