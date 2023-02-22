import { Request as IRequest, Response as IResponse } from 'express'
import { DBImplementationFactory } from 'src/infrastructure/db/implementations/DBImplementationFactory'
import { ErrorResponder } from 'src/error_handling/ErrorResponder'

import { CreateUserBusiness } from 'src/use_cases/create_user'

export class ControllerUser extends ErrorResponder {

	public static async createUser(req: IRequest, res: IResponse): Promise<void> {
		console.log('got the request!')
		console.log(req.body)
		try {
			const user = new CreateUserBusiness(new DBImplementationFactory())
			console.log('got the createUser use_case obj!', user)
			return res.status(200).send(await user.createUser(req.body)).end()
		} catch (error: any) {
			return res.status(500).send({ err: error.message }).end()
			//super.handleError(error as Error, res)
		}
	}
}