import { DataSource, DataSourceOptions } from 'typeorm'

export type queryType = 'insert' | 'update' | 'delete' | 'select'
export type TDBType = 'mongodb' | 'postgresql'

export interface IDBConnector {
	connect(connectionOptions: Partial<DataSourceOptions>, dbType: TDBType): Promise<void>
	disconnect(): Promise<void>
	getConnection(): DataSource
	reestablishConnection(): void
}