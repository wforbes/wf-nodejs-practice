import _ from 'lodash'
import { IDBAUser } from 'src/infrastructure/db/implementations/interfaces/IDBAUser'
import { IDBImplementationFactory } from 'src/infrastructure/db/implementations/interfaces/IDBImplementationFactory'
import { ModelUser, TProfile } from 'src/models/ModelUser'
import { TCreateUserData, TUser, TCreateUserResponse } from './types'

export class CreateUserBusiness {
	private userDB: IDBAUser

	constructor(dbImplFactory: IDBImplementationFactory) {
		console.log('use_cases constructor')
		this.userDB = dbImplFactory.getImplementation('user')
	}

	public async createUser(userData: Partial<TCreateUserData>): Promise<TCreateUserResponse> {
		console.log('hit CreateUserBusiness.createUser func')
		
		try {
			//this.validateRequiredFields(userData)
			//const newUser: TUser = await this.getUserDataForInsert(userData)
			const newUser: TUser = {
				userId: this.generateUUID(),
				username: userData.username!,
				email: userData.email!,
				password: userData.password!, //TODO: encrypt password
				//passhash
			}
			const { userId, email, username }: ModelUser = await this.userDB.insert(newUser);
			console.log('dbUser', {userId, username, email})
			return {
				userId, email, username
			}
		} catch(error) {
			console.log('error', error)
			return { userId: '', email: '', username: '' }
		}

		
	}

	private validateRequiredFields(userData) {
		const isNotValid = (
			_.isEmpty(userData.email)
			|| _.isEmpty(userData.password)
			|| !userData.firstName
			|| !userData.lastName
		  )
		if (isNotValid) throw new Error('Bad signup request! Missing required fields.')
	}

	private async getUserDataForInsert(data: Partial<TCreateUserData>): Promise<TUser> {
		try {
			const passhash = await this.hashPassword(data.password!)
			const userId = this.generateUUID()
			//const profile = this.generateUserProfile(data)
			return {
				userId,
				username: data.username || '',
				email: data.email || '',
				password: passhash,//TODO: encrypt password
				//passhash,
				//profile
			}
		} catch (error) {
			throw error
		}
	}

	private generateUUID(): string {
		const crypto = require('crypto')
		return crypto.randomUUID()
	}

	private async hashPassword(password: string): Promise<string> {
		const bcrypt = require('bcrypt')
		const saltRounds = 10
		return await bcrypt.getSalt(saltRounds, (salt: string) => {
			return bcrypt.hash(password, salt)
		}).catch((error: Error) => {
			throw error
		})
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