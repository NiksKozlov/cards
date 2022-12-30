import { AppRootStateType } from '../../app/store'

export const userID = (state: AppRootStateType) => state.profile._id
