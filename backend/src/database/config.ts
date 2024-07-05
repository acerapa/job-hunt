import { DataSourceOptions } from "typeorm";
import { getEnvOrDefault } from "../helpers/env-helpers";
import path from "path";

const config: DataSourceOptions = {
  type: getEnvOrDefault(
    "DB_TYPE",
    "mysql" as
      | "mysql"
      | "mariadb"
      | "postgres"
      | "sqlite"
      | "mssql"
      | "sap"
      | "oracle"
      | "mongodb"
  ),
  host: getEnvOrDefault("DB_HOST", "localhost"),
  port: getEnvOrDefault("DB_PORT", 3306),
  username: getEnvOrDefault("DB_USERNAME", "root"),
  password: getEnvOrDefault("DB_PASSWORD", "password"),
  database: getEnvOrDefault("DB_NAME", "job_hunt_db"),
  synchronize: true, // development mode,
  entities: [path.dirname(__dirname) + "/entities/**/*.ts"],
};

export default config;
