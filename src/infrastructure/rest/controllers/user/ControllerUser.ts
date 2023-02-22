import { Request as IRequest, Response as IResponse } from 'express'
import { DBImplementationFactory } from 'src/infrastructure/db/implementations/DBImplementationFactory'
import { ErrorResponder } from 'src/error_handling/ErrorResponder'

import { CreateUserBusiness } from 'src/use_cases/create_user'

export class ControllerUser extends ErrorResponder {

	public static async createUser(req: IRequest, res: IResponse): Promise<void> {
		console.log('got the request!')
		try {
			const user = new CreateUserBusiness(new DBImplementationFactory())
			console.log('got the createUser business logic!')
			//req.
			return res.status(200).send({ msg: "ok!" }).end()
		} catch (error) {
			super.handleError(error as Error, res)
		}
	}
}