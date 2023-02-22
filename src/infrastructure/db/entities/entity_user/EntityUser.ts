import { Entity, ObjectIdColumn, Column, BeforeInsert } from "typeorm"
import { IEntityUser } from './types'
import { AEntity } from '../AEntity'

const defaultContentBlock = { show: false, content: { text: '' } }

@Entity({ synchronize: false, name: 'User'})
export class EntityUser extends AEntity<IEntityUser> implements IEntityUser {

    @ObjectIdColumn()
    public _id!: IEntityUser['_id']

	@Column()
	public userId!: IEntityUser['userId']

    @Column()
    public email!: IEntityUser['email']

	@Column()
	public username!: IEntityUser['username']

	@Column()
	public passhash!: IEntityUser['passhash']

	@Column()
	public profile!: IEntityUser['profile']

	@BeforeInsert()
	public async insertId(): Promise<void> {
		this._id = await super.getAutoIncrementedId('ControlsProposal')
	}
}
