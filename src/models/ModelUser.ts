export type TProfile = {
	profileId: string
    firstName: string
	lastName: string
	age: number
	phone: string
}

export interface ModelNewUser {
	email: string
	firstName: string
	lastName: string
	username: string
	password: string
	repeatPassword: string
}

export interface ModelUser {
	id: number
	userId: string
	email: string
	username: string
	passhash: string //TODO: encrypt password
	//profile: TProfile
}