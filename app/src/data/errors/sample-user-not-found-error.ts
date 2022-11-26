import { BusinessValidationError } from './business-validation-error'

export class SampleUserNotFoundError extends BusinessValidationError {
  static code: string = 'USER_NOT_FOUND'

  constructor (userId: number) {
    const message = `User not found for id: ${userId}`
    super(message, SampleUserNotFoundError.code)
  }
}
