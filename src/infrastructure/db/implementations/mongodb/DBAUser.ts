import { DataSource } from 'typeorm'
import { DBConnectorFactory } from 'src/infrastructure/db/connector/DBConnectorFactory'
import { AbstractDatabase } from 'src/infrastructure/db/implementations/AbstractDatabase'
import { IDBAUser } from 'src/infrastructure/db/implementations/interfaces/IDBAUser'
import { ModelUser } from 'src/models/ModelUser'
import { EntityUser } from 'src/infrastructure/db/entities/entity_user/EntityUser'

export class DBAUser extends AbstractDatabase implements IDBAUser {
	private connection!: DataSource

	constructor() {
		super()
		this.connection = new DBConnectorFactory().getConnector('wf-mongodb').getConnection()
	}

	public async insert(userData: ModelUser): Promise<ModelUser> {
		try {
			const toSave = new EntityUser(userData)
			return await this.connection.mongoManager.save(toSave)
		} catch (error) {
			//TODO: implement AbstractDatabase and utility package logic
			//throw super.handleDBImplError(error as Error)
			throw error
		}
	}
}