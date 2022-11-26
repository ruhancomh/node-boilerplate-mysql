import { ISampleUserModel } from '../../../domain/models/sample-user-model'

export interface ISampleUserRepository {
  findById: (id: number) => Promise<ISampleUserModel | null>
}
