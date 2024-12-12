import { User as IUser } from '@shared/pack/dist'
import { User } from '../entities/User'
import { instanceToPlain } from 'class-transformer'
import AppDataSource, { checkConnection, initializeDataSource } from '../database'

export const updateUser = async (user_id: number, data: Partial<IUser>) => {
  let status = await checkConnection(AppDataSource)
  if (!status) {
    await initializeDataSource()
  }
  return await User.update(user_id, instanceToPlain(data))
}
