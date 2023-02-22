import _ from 'lodash'
import { IDBAUser } from 'src/infrastructure/db/implementations/interfaces/IDBAUser'
import { IDBImplementationFactory } from 'src/infrastructure/db/implementations/interfaces/IDBImplementationFactory'
import { ModelUser, TProfile } from 'src/models/ModelUser'
import { TCreateUserData, TUser, TCreateUserResponse } from './types'

export class CreateUserBusiness {
	private userDB: IDBAUser

	constructor(dbImplFactory: IDBImplementationFactory) {
		this.userDB = dbImplFactory.getImplementation('user')
	}

	public async createUser(userData: TCreateUserData): Promise<TCreateUserResponse> {
		console.log('hit createUser func')
		this.validateRequiredFields(userData)
		//this.validateUserDuplication(data)
		//this.validatePasswordMatch(data)
		//const user = this.getUserDataForInsert(userData)
		/*
		const {
			userId, email, username, profile
		} = await this.userDB.insert(user)

		return {
			userId, email, username, profile
		}
		*/
		return {
			userId: '1',
			email: userData.email,
			username: userData.username,
			profile: {
				profileId: '1',
				firstName: userData.firstName,
				lastName: userData.lastName,
				age: 35,
				phone: ''
			}
		}
	}

	private validateRequiredFields(userData) {
		const isNotValid = (
			_.isEmpty(userData.username)
			|| _.isEmpty(userData.email)
			|| _.isEmpty(userData.password)
			|| _.isEmpty(userData.repeatPassword)
			|| !userData.firstName
			|| !userData.lastName
		  )
		if (isNotValid) throw new Error('Bad signup request! Missing required fields.')
	}

	private getUserDataForInsert(data: Partial<TCreateUserData>): TUser {
		const passhash = this.hashPassword(data.password)
		const userId = this.generateUUID()
		const profile = this.generateUserProfile(data)
		return {
			userId,
			username: data.username || '',
			email: data.email || '',
			passhash,
			profile
		}
	}

	private hashPassword(password) {
		return ""
	}

	private generateUUID(): string {
		return ""
	}

	private generateUserProfile(userData): TProfile {
		return {
			profileId: this.generateUUID(),
			firstName: userData.firstName,
			lastName: userData.lastName,
			age: -1,
			phone: ""
		}
	}
}