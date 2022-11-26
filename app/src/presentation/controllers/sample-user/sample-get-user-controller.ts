import { SampleUserNotFoundError } from '../../../data/errors/sample-user-not-found-error'
import { ISampleGetUser } from '../../../domain/usecases/sample-get-user'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { responseOk, responseError } from '../../helpers/http-response-helper'
import { BaseController } from '../../protocols/base-controller'
import { HttpRequest } from '../../protocols/http-request'
import { HttpResponse } from '../../protocols/http-response'

export class SampleGetUserController implements BaseController {
  private readonly sampleGetUser: ISampleGetUser

  constructor (sampleGetUser: ISampleGetUser) {
    this.sampleGetUser = sampleGetUser
  }

  async handle (httRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userId = httRequest.params.userId
      const user = await this.sampleGetUser.get(userId)

      return responseOk(user)
    } catch (error) {
      if (error instanceof SampleUserNotFoundError) {
        return responseError(new ResourceNotFoundError(error.message))
      }

      return responseError(error)
    }
  }
}
