import { ISampleUserRepository } from '../../../../data/protocols/repositories/samples-user-repository'
import { ISampleUserModel } from '../../../../domain/models/sample-user-model'
import { SampleUserMysqlModel } from '../models/sample-user-model'

export class SampleUserMysqlRepository implements ISampleUserRepository {
  async findById (id: number): Promise<ISampleUserModel | null> {
    try {
      return await SampleUserMysqlModel.findByPk(id)
    } catch (error) {
      console.log(error.message)
      return null
    }
  }
}
