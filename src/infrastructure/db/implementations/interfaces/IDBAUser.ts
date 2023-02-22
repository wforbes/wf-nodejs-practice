import { ModelUser } from 'src/models/ModelUser'

export interface IDBAUser {
	insert(userData: Partial<ModelUser>): Promise<ModelUser>
}