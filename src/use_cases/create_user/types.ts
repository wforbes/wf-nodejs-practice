import { ModelUser, ModelNewUser } from 'src/models/ModelUser'

export type TCreateUserData = Pick<ModelNewUser,
	| 'username'
	| 'firstName'
	| 'lastName'
	| 'email'
	| 'password'
	| 'repeatPassword'
>

export type TUser = Pick<ModelUser,
	| 'userId'
	| 'email'
	| 'username'
	| 'password'
	//| 'passhash'
	//| 'profile'
>

export type TCreateUserResponse = Pick<ModelUser,
	| 'userId'
	| 'email'
	| 'username'
	//| 'profile'
>