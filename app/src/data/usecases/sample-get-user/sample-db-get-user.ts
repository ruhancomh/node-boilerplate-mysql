import { ISampleUserModel } from '../../../domain/models/sample-user-model'
import { ISampleGetUser } from '../../../domain/usecases/sample-get-user'
import { SampleUserNotFoundError } from '../../errors/sample-user-not-found-error'
import { ISampleUserRepository } from '../../protocols/repositories/samples-user-repository'

export class SampleDbGetUser implements ISampleGetUser {
  private readonly sampleUserRepository: ISampleUserRepository

  constructor (sampleUserRepository: ISampleUserRepository) {
    this.sampleUserRepository = sampleUserRepository
  }

  async get (id: number): Promise<ISampleUserModel> {
    const user = await this.sampleUserRepository.findById(id)

    if (user === null) {
      throw new SampleUserNotFoundError(id)
    }

    return user
  }
}
