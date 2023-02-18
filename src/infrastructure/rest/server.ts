import Express, { Express as IExpress, NextFunction, Request as IRequest, Response as IResponse } from 'express'
import Http from 'http'
import Cors from 'cors'

import { TEndpoint } from 'src/middleware/types'
import { Endpoints } from './Endpoints'

export async function setupServer(): Promise<void> {
	const port = Number(process.env.WF_NODEJS_SERVER_REST_PORT || 4201)
	const server: IExpress = Express()

	await setMiddleware(server)
	setEndpoints(server)

	Http.createServer(server).listen(port, () => {
		console.log(`REST server is running on port ${port}`)
	})
}

async function setMiddleware(server: IExpress) {
	server.use(Express.json())
	server.use(setAllowHeaders)
	server.use(Cors({ preflightContinue: false }))
	server.use(Express.urlencoded({ extended: true}))
	//server.use(Middleware.getSessionValidatorMiddleware(Endpoints).validateSession) //TODO: implement authorization 
}

function setAllowHeaders(_req: IRequest, res: IResponse, next: NextFunction) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Authorization')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	next()
}

function setEndpoints(server: IExpress) {
	const router = Express.Router()
	Endpoints.forEach((endpoint: TEndpoint) => {
		endpoint.actions.forEach((action) => {
			switch (action.method) {
				case ('get'): {
					router.get(endpoint.url, action.func)
					break
				}
				case ('post'): {
					router.post(endpoint.url, action.func)
					break
				}
				case ('put'): {
					router.put(endpoint.url, action.func)
					break
				}
				case ('delete'): {
					router.delete(endpoint.url, action.func)
					break
				}
			}
		})
	})
	server.use('/', router)
}
