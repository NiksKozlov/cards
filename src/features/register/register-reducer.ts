import {AppThunkDispatch} from "../../app/store";
import {authAPI} from "../../api/cards-api";


type SetRegistrationDataActionType = {
    type: 'SET-REGISTRATION-DATA'
    email: string
    password: string
    isRegistered: boolean
}

type setRegisterServerErrorActionType = {
    type: 'SET-REGISTER-SERVER-ERROR'
    error: string
}

type RegisterActionsType = SetRegistrationDataActionType | setRegisterServerErrorActionType

type IninStateType = {
    email: string
    password: string
    error: string
    isRegistered: boolean
}

const initState: IninStateType = {
    email: '',
    password: '',
    error: '',
    isRegistered: false
}

export const registerReducer = (state = initState, action: RegisterActionsType): IninStateType => {
    switch (action.type) {
        case 'SET-REGISTRATION-DATA':
            return {...state, email: action.email, password: action.password, isRegistered: action.isRegistered}
        case 'SET-REGISTER-SERVER-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setRegistrationData = (email: string, password: string, isRegistered: boolean): SetRegistrationDataActionType => ({
    type: 'SET-REGISTRATION-DATA',
    email,
    password,
    isRegistered
})
export const setRegisterServerErrorAC = (error: string): setRegisterServerErrorActionType => ({
    type: 'SET-REGISTER-SERVER-ERROR',
    error
})

export const registration = (email: string, password: string) => async (dispatch: AppThunkDispatch) => {
    try {
        const response = await authAPI.register(email, password) // is registor
        console.log(response)
        if (response.data.error) {
            setRegisterServerErrorAC(response.data.error)
        } else {
            dispatch(setRegisterServerErrorAC(''))
            dispatch(setRegistrationData(email, password, true))
        }
    } catch (err) {
        console.log(err)
    }
}

