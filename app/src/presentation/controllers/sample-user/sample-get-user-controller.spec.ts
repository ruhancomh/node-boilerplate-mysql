import { SampleUserNotFoundError } from '../../../data/errors/sample-user-not-found-error'
import { ISampleUserModel } from '../../../domain/models/sample-user-model'
import { ISampleGetUser } from '../../../domain/usecases/sample-get-user'
import { InternalServerError } from '../../errors/internal-server-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { HttpRequest } from '../../protocols/http-request'
import { SampleGetUserController } from './sample-get-user-controller'

describe('SampleGetUser Controller', () => {
  test('Should call getUser with correct userId', async () => {
    // Arrange
    const { sut, getUserStub } = makeSut()
    const getSpy = jest.spyOn(getUserStub, 'get')
    const fakeRequest = makeFakeRequest()

    // Act
    await sut.handle(fakeRequest)

    // Assert
    expect(getSpy).toBeCalledWith(123)
  })

  test('Should return a sample user and 200 on success', async () => {
    // Arrange
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()
    const expectedUser: ISampleUserModel = {
      id: 123,
      name: 'foo_bar',
      createdAt: new Date('2022-06-13T10:00:00')
    }

    // Act
    const httpResponse = await sut.handle(fakeRequest)

    // Assert
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(expectedUser)
  })

  test('Should return 404 if no user found', async () => {
    // Arrange
    const { sut, getUserStub } = makeSut()

    jest.spyOn(getUserStub, 'get').mockImplementationOnce(() => {
      throw new SampleUserNotFoundError(123)
    })

    const fakeRequest = makeFakeRequest()

    // Act
    const httpResponse = await sut.handle(fakeRequest)

    // Assert
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual(new ResourceNotFoundError('User not found for id: 123'))
  })

  test('Should return 500 if GetUser throws', async () => {
    // Arrange
    const { sut, getUserStub } = makeSut()

    jest.spyOn(getUserStub, 'get').mockImplementationOnce(() => {
      throw new Error()
    })

    const fakeRequest = makeFakeRequest()

    // Act
    const httpResponse = await sut.handle(fakeRequest)

    // Assert
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError())
  })
})

interface SutTypes {
  sut: SampleGetUserController
  getUserStub: ISampleGetUser
}

class SampleGetUserStub implements ISampleGetUser {
  async get (id: number): Promise<ISampleUserModel> {
    return await Promise.resolve({
      id,
      name: 'foo_bar',
      createdAt: new Date('2022-06-13T10:00:00')
    })
  }
}

const makeSut = (): SutTypes => {
  const getUserStub = new SampleGetUserStub()

  return {
    sut: new SampleGetUserController(getUserStub),
    getUserStub
  }
}

const makeFakeRequest = (): HttpRequest => {
  return {
    params: {
      userId: 123
    }
  }
}
