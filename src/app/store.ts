import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { authReducer } from '../features/login/auth-reducer'
import { profileReducer } from '../features/profile/profile-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к tests в любой момент
// @ts-ignore
window.store = store
