import { ModelUser } from 'src/models/ModelUser'

export type IEntityUser = Omit<ModelUser, 'id'> & { _id: number }