import { IDBImplementationFactory, TDBFactoryImplementationType } from 'src/infrastructure/db/implementations/interfaces/IDBImplementationFactory'
import { DBAUser } from 'src/infrastructure/db/implementations/mongodb/DBAUser'

export class DBImplementationFactory implements IDBImplementationFactory {
	getImplementation<TImplementation>(type: TDBFactoryImplementationType): TImplementation {
		switch(type) {
			case 'user': {
				return new DBAUser() as unknown as TImplementation
			}
			default: {
				throw Error('DBImplementationFactory dun goofed!')
			}
		}
	}
}
