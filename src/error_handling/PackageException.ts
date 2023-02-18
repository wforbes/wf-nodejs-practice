// originates from external package, referring to a system exception there
import { ErrorHandlingTypes } from './types'

export class PackageException extends Error {
	public httpCode!: number | undefined
	public code!: string
	public details?: string

	constructor(
		errorKey: string,
		exceptions: ErrorHandlingTypes.TExceptionRecords,
		details?: string
	) {
		const error = exceptions?.[errorKey]
		super(error?.message ?? '')
		this.code = error?.code ?? ''
		this.details = details ?? ''
		this.httpCode = error?.httpCode
	}
}