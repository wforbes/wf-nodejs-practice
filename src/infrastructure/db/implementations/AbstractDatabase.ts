import { TypeORMError } from 'typeorm'
//import { getException } from 'src/utils/exceptions'
//TODO: implement logic from utility package, used in utils/exception

export abstract class AbstractDatabase {
  protected handleDBImplError<T extends TypeORMError>(error: T): void {
    //throw getException('dbError', error.message)
	throw error
  }
}