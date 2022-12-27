import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { forgotPasswordReducer } from '../features/auth/forgot-password/forgotPassword-reducer'
import { AuthActionsTypes, authReducer } from '../features/auth/login/auth-reducer'
import { newPasswordReducer } from '../features/auth/new-password/newPassword-reducer'
import { registerReducer } from '../features/auth/register/register-reducer'
import { CardsActionsTypes, cardsReducer } from '../features/cards/cardList/cards-reducer'
import { PacksActionsTypes, packsReducer } from '../features/packs/packsList/packs-reducer'
import { ProfileActionsTypes, profileReducer } from '../features/profile/profile/profile-reducer'

import { AppActionsType, appReducer } from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,
  newPassword: newPasswordReducer,
  packs: packsReducer,
  cards: cardsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type ActionAll =
  | AppActionsType
  | AuthActionsTypes
  | ProfileActionsTypes
  | PacksActionsTypes
  | CardsActionsTypes
// а это, чтобы можно было в консоли браузера обращаться к tests в любой момент
// @ts-ignore
window.store = store
