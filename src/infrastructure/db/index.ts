import { DBConnectorFactory } from './connector/DBConnectorFactory'

async function connectTypeORM(): Promise<any> {
	const connectorFactory = new DBConnectorFactory

	await connectorFactory.setConnector('wf-mongodb')
	connectorFactory.getConnector('wf-mongodb')?.reestablishConnection()
	console.log('Connected to MongoDB')
}

export async function setupDB(): Promise<void> {
	try {
		await connectTypeORM()
		return Promise.resolve()
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}