import { Request as IRequest, Response as IResponse } from 'express'
import { ErrorResponder } from 'src/error_handling/ErrorResponder'

export class ControllerUser extends ErrorResponder {
	 public static async createUser(req: IRequest, res: IResponse): Promise<void> {
		try {
			//TODO: create user DB call
			console.log('got the request!')
			return res.status(200).send({ msg: "ok!" }).end()
		} catch (error) {
			super.handleError(error as Error, res)
		}
	 }
}