import { IDBConnector, TDBType } from './IDBConnector'
import { DataSource, DataSourceOptions } from 'typeorm'

import { EntityUser } from 'src/infrastructure/db/entities/entity_user/EntityUser'

export class DBConnector implements IDBConnector {
	private connection!: DataSource
	private connectionType!: DataSourceOptions['type'] | undefined

	constructor(connectionType?: DataSourceOptions['type']) {
		this.connectionType = connectionType
	}

	public async connect(connectionOptions: DataSourceOptions, dbType: TDBType): Promise<void> {
		this.connection = await new DataSource({
			...connectionOptions,
			type: this.connectionType,
			entities: this.getEntitiesByDbType(dbType)
		} as any).initialize()
	}

	private getEntitiesByDbType(dbType: TDBType) {
		switch (dbType) {
			case ('mongodb'): {
				return [ EntityUser ] //add new entities here
			}
		}
	}

	public getConnection(): DataSource {
		return this.connection
	}

	public reestablishConnection(): void {
		setInterval(async () => {
			if (!this.connection.isInitialized) {
				try {
					this.connection = await this.connection.initialize()
				} catch (error) { return }
			}
		}, 1000 * 6)
	}

	public async disconnect(): Promise<void> {
		if (this.connection) {
			await this.connection.destroy() //NOTE: read about depreciation of .close()
		}
	}
}