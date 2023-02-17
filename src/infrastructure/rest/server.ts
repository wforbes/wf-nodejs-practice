import Express, { Express as IExpress, Request as IRequest, Response as IResponse } from 'express'
import Http from 'http'
import Cors from 'cors'

export async function setupServer() {
	const server: IExpress = Express()

	Http.createServer(server).listen(() => {
		console.log('REST server is running...')
	})
}