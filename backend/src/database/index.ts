import { DataSource } from "typeorm";
import config from "./config";

const AppDataSource = new DataSource(config);

// check connection
export const checkConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (e) {
    console.error("Error during Data Source initialization", e);
  }
};

export default AppDataSource;
