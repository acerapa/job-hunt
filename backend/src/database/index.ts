import { DataSource } from 'typeorm'
import config from './config'

const AppDataSource = new DataSource(config)

// check connection
export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize()
    console.log('Data Source has been initialized!')
  } catch (e) {
    const { name } = e as Error
    if (name !== 'CannotConnectAlreadyConnectedError') {
      console.error('Error during Data Source initialization', e)
    }
  }
}

export const checkConnection = async (dataSource: DataSource): Promise<boolean> => {
  let status: boolean = false
  try {
    await dataSource.query('SELECT 1')
    status = true
  } catch (error) {
    status = false
  }
  return status
}

export default AppDataSource
