export type TDBFactoryImplementationType = 'user' | 'profile'

export interface IDBImplementationFactory {
	getImplementation<TImplementation>(type: TDBFactoryImplementationType): TImplementation
}