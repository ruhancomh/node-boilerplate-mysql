import { ISampleUserModel } from '../../../domain/models/sample-user-model'
import { SampleUserNotFoundError } from '../../errors/sample-user-not-found-error'
import { ISampleUserRepository } from '../../protocols/repositories/samples-user-repository'
import { SampleDbGetUser } from './sample-db-get-user'

describe('DbGetUser UseCase', () => {
  test('Should throw if SampleUserRepository throws', async () => {
    // Arrange
    const { sut, sampleUserRepositoryStub } = makeSut()
    const userId: number = 123

    jest.spyOn(sampleUserRepositoryStub, 'findById')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    // Act
    const result = sut.get(userId)

    // Assert
    await expect(result).rejects.toThrow()
  })

  test('Should call SampleUserRepository with correct values', async () => {
    // Arrange
    const { sut, sampleUserRepositoryStub } = makeSut()
    const userId: number = 123
    const findByIdSpy = jest.spyOn(sampleUserRepositoryStub, 'findById')

    // Act
    await sut.get(userId)

    // Assert
    expect(findByIdSpy).toHaveBeenCalledWith(123)
  })

  test('Should return an sample user on success', async () => {
    // Arrange
    const { sut } = makeSut()
    const userId: number = 123
    const expectedUser: ISampleUserModel = {
      id: 123,
      name: 'foo_bar',
      createdAt: new Date('2022-06-13T10:00:00')
    }

    // Act
    const user = await sut.get(userId)

    // Assert
    expect(user).toEqual(expectedUser)
  })

  test('Should throw SampleUserNotFoundError if user not found', async () => {
    // Arrange
    const { sut, sampleUserRepositoryStub } = makeSut()
    const userId: number = 123

    jest.spyOn(sampleUserRepositoryStub, 'findById')
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))

    // Act
    const result = sut.get(userId)

    // Assert
    await expect(result).rejects.toThrow(SampleUserNotFoundError)
  })
})

interface SutTypes {
  sut: SampleDbGetUser
  sampleUserRepositoryStub: SampleUserRepositoryStub
}

class SampleUserRepositoryStub implements ISampleUserRepository {
  async findById (id: number): Promise<ISampleUserModel | null> {
    const fakeUser: ISampleUserModel = {
      id: 123,
      name: 'foo_bar',
      createdAt: new Date('2022-06-13T10:00:00')
    }

    return fakeUser
  }
}

const makeSut = (): SutTypes => {
  const sampleUserRepositoryStub = new SampleUserRepositoryStub()
  const sut = new SampleDbGetUser(sampleUserRepositoryStub)

  return {
    sut,
    sampleUserRepositoryStub
  }
}
