import { TEndpoint } from 'src/middleware/types'
import { UserEndpoints } from './controllers/user/EndpointsUser'

export const Endpoints: TEndpoint[] = [
	...UserEndpoints
]