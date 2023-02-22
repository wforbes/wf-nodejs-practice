import { Entity, ObjectIdColumn, Column } from "typeorm"
import { IEntityProfile } from './types'

@Entity()
export class EntityProfile {

    @ObjectIdColumn()
    public _id!: IEntityProfile['_id']

	@Column()
	public profileId!: IEntityProfile['profileId']

    @Column()
    public firstName!: IEntityProfile['firstName']

	@Column()
    public lastName!: IEntityProfile['lastName']

	@Column()
    public age!: IEntityProfile['age']

	@Column()
    public phone!: IEntityProfile['phone']

}
