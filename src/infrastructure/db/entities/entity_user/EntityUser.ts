import { Entity, ObjectIdColumn, Column, BeforeInsert, PrimaryColumn } from "typeorm"
import { IEntityUser } from './types'
import { AEntity } from '../AEntity'

const defaultContentBlock = { show: false, content: { text: '' } }

@Entity({ synchronize: false, name: 'Users'})
export class EntityUser extends AEntity<IEntityUser> implements IEntityUser {

    @ObjectIdColumn()
    public id!: IEntityUser['id']

	@Column()
	public userId!: IEntityUser['userId']

    @Column()
    public email!: IEntityUser['email']

	@Column()
	public username!: IEntityUser['username']

	//TODO: encrypt password
	@Column()
	public password!: IEntityUser['password']

	//@Column()
	//public profile!: IEntityUser['profile']

	/*@BeforeInsert()
	public async insertId(): Promise<void> {
		this._id = await super.getAutoIncrementedId('User')
	}*/
}
