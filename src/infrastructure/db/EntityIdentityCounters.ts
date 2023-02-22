import { Column, Entity, ObjectIdColumn } from 'typeorm'

type Tid = { $oid: string }

@Entity({ synchronize: false, name: 'IdentityCounters' })
export class EntityIdentityCountersMongoDB {
	@ObjectIdColumn()
	public _id: Tid = { $oid: '' }
	@Column()
	public model = ''
	@Column()
	public field = ''
	@Column()
	public count = 0
}