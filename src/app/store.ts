import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/login/auth-reducer';
import {profileReducer} from '../features/profile/profile-reducer';
import {registerReducer} from "../features/register/register-reducer";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    register: registerReducer
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector



// а это, чтобы можно было в консоли браузера обращаться к tests в любой момент
// @ts-ignore
window.store = store