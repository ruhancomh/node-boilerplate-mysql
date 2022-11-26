import { makeSampleGetUserController } from '../factories/sample-get-user-controller-factory'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/users/:userId', adaptRoute(makeSampleGetUserController()))
}
