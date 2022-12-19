import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { forgotPasswordReducer } from '../features/forgot-password/forgotPassword-reducer'
import { AuthActionsTypes, authReducer } from '../features/login/auth-reducer'
import { newPasswordReducer } from '../features/new-password/newPassword-reducer'
import { profileReducer } from '../features/profile/profile-reducer'
import { registerReducer } from '../features/register/register-reducer'

import { AppActionsType, appReducer } from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,
  newPassword: newPasswordReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type ActionAll = AppActionsType | AuthActionsTypes
// а это, чтобы можно было в консоли браузера обращаться к tests в любой момент
// @ts-ignore
window.store = store
