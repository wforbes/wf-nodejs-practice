import { ModelProfile } from 'src/models/ModelProfile'

export type IEntityProfile = Omit<ModelProfile, 'id'> & { _id: number }