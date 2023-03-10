import { TEndpoint } from 'src/middleware/types'
import { ControllerUser } from './ControllerUser'

export const UserEndpoints: TEndpoint[] = [
	{
		url: '/user/signup',
		actions: [
			{
				method: 'post',
				func: ControllerUser.createUser,
				validateSession: true
			}
		]
	}
]