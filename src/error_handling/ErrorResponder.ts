import { Response as IResponse } from 'express'
import { ErrorHandlingTypes } from 'src/error_handling/types'
//import { getException } from 'src/utils/exceptions //TODO: add file that exposes exception list

export abstract class ErrorResponder {
	protected static handleError(error: Error | ErrorHandlingTypes.TException, res: IResponse): void {
		if (ErrorResponder.isSystemException(error)) {
			return ErrorResponder.sendError(error, res, error.httpCode ?? 500)
		}
		
		ErrorResponder.sendError(
			error,
			res,
			500
		)
	}

	private static sendError(error: Error | ErrorHandlingTypes.TException, res: IResponse, status: number): void {
		if (!res.headersSent) {
			if (ErrorResponder.isSystemException(error)) delete error.httpCode
			res.status(status).send({
				...error,
				message: error.message
			}).end()
		}
	}

	private static isSystemException(error: Error | ErrorHandlingTypes.TException): error is ErrorHandlingTypes.TException {
		return !!(error as ErrorHandlingTypes.TException).code
	}
}