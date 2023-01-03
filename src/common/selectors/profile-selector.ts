import { AppRootStateType } from '../../app/store'

export const userID = (state: AppRootStateType) => state.profile._id
export const userAva = (state: AppRootStateType) => state.profile.avatar
export const userName = (state: AppRootStateType) => state.profile.name
