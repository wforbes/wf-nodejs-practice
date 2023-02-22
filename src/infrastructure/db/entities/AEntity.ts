import { DataSource } from 'typeorm'
import { DBConnectorFactory } from 'src/infrastructure/db/connector/DBConnectorFactory'
import { EntityIdentityCountersMongoDB } from '../EntityIdentityCounters'

export abstract class AEntity<T> {
	constructor(data?: T) {
		if (data) {
			Object.keys(data).forEach((key) => {
				this[key] = data[key]
			})
		}
	}

	protected async getAutoIncrementedId(nameTable: string): Promise<number> {
		const repository = this.connection().getMongoRepository(EntityIdentityCountersMongoDB)
		const response = await repository.findOne({
			where: { model: nameTable }
		}) as EntityIdentityCountersMongoDB
		const id: number = response.count + 1
		await repository.updateOne({ _id: response._id }, { $set: { count: id } })
		return id
	}

	protected connection(): DataSource {
		return new DBConnectorFactory().getConnector('wf-mongodb').getConnection()
	}
}