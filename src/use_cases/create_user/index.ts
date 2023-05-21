import _ from 'lodash'
import { IDBAUser } from 'src/infrastructure/db/implementations/interfaces/IDBAUser'
import { IDBImplementationFactory } from 'src/infrastructure/db/implementations/interfaces/IDBImplementationFactory'
import { ModelUser, TProfile } from 'src/models/ModelUser'
import { TCreateUserData, TUser, TCreateUserResponse } from './types'
import { emailRegex } from 'src/utils/validation'

export class CreateUserBusiness {
	private userDB: IDBAUser

	constructor(dbImplFactory: IDBImplementationFactory) {
		console.log('use_cases constructor')
		this.userDB = dbImplFactory.getImplementation('user')
	}

	public async createUser(userData: TCreateUserData): Promise<TCreateUserResponse> {
		console.log('hit CreateUserBusiness.createUser func')
		console.log(userData)
		
		try {
			this.validate(userData)
			const newUser: TUser = await this.getUserDataForInsert(userData)
			/*
			const newUser: TUser = {
				userId: this.generateUUID(),
				username: userData.username!,
				email: userData.email!,
				password: userData.password!, //TODO: encrypt password
				//passhash
			}*/
			const { userId, email, username }: ModelUser = await this.userDB.insert(newUser)
			console.log('dbUser', {userId, username, email})
			return {
				userId, email, username
			}
		} catch(error) {
			console.log('error', error)
			//return { userId: '', email: '', username: '' }
			return Promise.reject(error)
		}

		
	}

	private validate(userData: TCreateUserData) {
		let errorResponses: string[] = Array.prototype.concat([],
			...this.checkForEmptyFields(userData),
			...this.checkForInvalidFields(userData)
		);
		
		if (errorResponses.length > 0) {
			throw new Error('Bad signup request: ' + errorResponses.join(', '))
		}

			
	}

	private checkForEmptyFields(userData: TCreateUserData): string[] {
		let errorResponses: string[] = []
		if (_.isEmpty(userData.email)) errorResponses.push('Email is required')
		if (_.isEmpty(userData.password)) errorResponses.push('Password is required')
		if (_.isEmpty(userData.repeatPassword)) errorResponses.push('RepeatPassword is required')
		if (_.isEmpty(userData.firstName)) errorResponses.push('First name is required')
		if (_.isEmpty(userData.lastName)) errorResponses.push('Last name is required')
		if (_.isEmpty(userData.username)) errorResponses.push('Username is required')
		return errorResponses;
	}

	private checkForInvalidFields(userData: TCreateUserData): string[] {
		let errorResponses: string[] = [];
		if (!this.isValidEmail(userData.email)) errorResponses.push('Email is invalid');
		//if (!this.isValidUsername(userData.username)) errorResponses.push('Username is invalid');
		if (userData.password !== userData.repeatPassword) errorResponses.push('Passwords do not match');
		return errorResponses;
	}

	private isValidEmail(email: string): boolean {
		return emailRegex.test(email);
	}
	/*
	private isValidUsername(username: string): boolean {
		
	}*/

	private async getUserDataForInsert(data: Partial<TCreateUserData>): Promise<TUser> {
		try {
			const userId = this.generateUUID()
			const passhash = await this.hashPassword(data.password!)
			//const profile = this.generateUserProfile(data)
			return {
				userId,
				username: data.username!,
				email: data.email!,
				passhash,
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
		const bcrypt = require('bcryptjs')
		const saltRounds = 10
		const salt = await bcrypt.genSalt(saltRounds)
		return bcrypt.hash(password, salt).catch((error: Error) => {
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