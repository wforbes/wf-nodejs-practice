import { DataSourceOptions } from 'typeorm/data-source'
import { IDBConnector } from './IDBConnector'
import { DBConnector } from './DBConnector'

const connectionsMap: Map<string, IDBConnector> = new Map()
type ConnectorType = 'wf-mongodb' | 'wf-postgres'

export class DBConnectorFactory {
	public getConnector(type: ConnectorType): IDBConnector {
		return connectionsMap.get(type) as IDBConnector
	}

	async setConnector(type: ConnectorType): Promise<void> {
		let connector: IDBConnector
		
		switch(type) {
			case('wf-mongodb'): {
				const connectionOptions = this.getParsedConnectionParams(
					JSON.parse(process.env.WF_MONGODB || '{}'), type
				)
				console.log(connectionOptions)
				connector = new DBConnector('mongodb')
				await connector.connect(connectionOptions, 'mongodb')
				connectionsMap.set(type, connector)
				break
			}
			case('wf-postgres'): {
				console.log('postgres not set up yet...')
				break
			}

		}
	}

	private getParsedConnectionParams(params: Record<string, string|number>, connectionName: string): Partial<DataSourceOptions> {
		return {
			// type prop set in DBConnector
			host: params.host as string,
			port: params.port as number,
			database: params.db as string,
			username: params.user as string,
			password: params.password as string,
			ssl: !!params.ssl,
			logging: false,
			pool: true,
			useUnifiedTopology: true,
			synchronize: false
		} as Partial<DataSourceOptions>
	}
}