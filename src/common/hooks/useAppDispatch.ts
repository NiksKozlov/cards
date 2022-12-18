import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppRootStateType } from '../../app/store'
import { ActionsTypes } from '../../features/login/auth-reducer'

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  ActionsTypes
>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
