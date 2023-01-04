import { AppRootStateType } from '../../app/store'

export const userIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
