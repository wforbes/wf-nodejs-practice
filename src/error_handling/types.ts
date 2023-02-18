import { PackageException } from './PackageException'

export namespace ErrorHandlingTypes {
	export type TException = PackageException
	export type TExceptionRecords<T extends string = ''> = Record<T, Omit<TException, 'name'>>
}