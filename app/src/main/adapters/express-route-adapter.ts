import { BaseController } from '../../presentation/protocols/base-controller'
import { HttpRequest } from '../../presentation/protocols/http-request'
import { Request, Response } from 'express'

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      query: req.query,
      params: req.params,
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
