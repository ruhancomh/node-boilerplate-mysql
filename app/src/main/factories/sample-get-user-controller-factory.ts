import { SampleDbGetUser } from '../../data/usecases/sample-get-user/sample-db-get-user'
import { SampleUserMysqlRepository } from '../../infra/db/mysql/repositories/sample-user-repository'
import { SampleGetUserController } from '../../presentation/controllers/sample-user/sample-get-user-controller'

export const makeSampleGetUserController = (): SampleGetUserController => {
  const userRepository = new SampleUserMysqlRepository()
  const getUser = new SampleDbGetUser(userRepository)

  return new SampleGetUserController(getUser)
}
