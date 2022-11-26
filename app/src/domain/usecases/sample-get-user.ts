import { ISampleUserModel } from '../models/sample-user-model'

export interface ISampleGetUser {
  get: (id: number) => Promise<ISampleUserModel>
}
