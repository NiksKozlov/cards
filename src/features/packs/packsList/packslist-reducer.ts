import { packsAPI } from '../../../api/packs-api'
import { AppThunk } from '../../../common/hooks/useAppDispatch'

import { AddNewPackLocalStateType } from './packsListCrud/AddNewPack'
import { EditPackLocalStateType } from './packsListCrud/EditPack'

const initialState = {
  _id: '',
  name: '',
  deckCover: '',
  private: false,
}

type InitialStateType = typeof initialState

export const packsListReducer = (
  state: InitialStateType = initialState,
  action: PacksListActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'PACKSLIST/ADD-NEW-PACK':
      console.log('id=' + action.packData._id)
      console.log(action.packData.name)

      return {
        ...state,
        name: action.packData.name,
        deckCover: action.packData.name,
        private: action.packData.private,
      }
    case 'PACKSLIST/EDIT-PACK':
      console.log(action.packData.name)

      return {
        ...state,
        _id: action.packData._id,
        name: action.packData.name,
      }
    case 'PACKSLIST/DELETE-PACK':
      console.log('Pack Deleted')
      console.log(state)

      return state
    default:
      return state
  }
}

// Actions
export const addNewPackAC = (packData: InitialStateType) =>
  ({ type: 'PACKSLIST/ADD-NEW-PACK', packData } as const)

export const editPackAC = (packData: InitialStateType) =>
  ({ type: 'PACKSLIST/EDIT-PACK', packData } as const)

export const deletePackAC = (packData: InitialStateType) =>
  ({ type: 'PACKSLIST/DELETE-PACK', packData } as const)

// Thunks
export const addNewPackTC =
  (packData: AddNewPackLocalStateType): AppThunk =>
  async dispatch => {
    try {
      const res = await packsAPI.addNewPack(packData)

      dispatch(addNewPackAC(res.data.newCardsPack))
    } catch (e) {
      console.log('error: ', e)
    }
  }

export const editPackTC =
  (packData: EditPackLocalStateType): AppThunk =>
  async dispatch => {
    try {
      const res = await packsAPI.editPack(packData)

      dispatch(editPackAC(res.data.updatedCardsPack))
    } catch (e) {
      console.log('error: ', e)
    }
  }

export const deletePackTC =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      const res = await packsAPI.deletePack(id)

      dispatch(deletePackAC(res.data.deletedCardsPack))
    } catch (e) {
      console.log('error: ', e)
    }
  }

// Types
export type PacksListActionsTypes =
  | ReturnType<typeof addNewPackAC>
  | ReturnType<typeof editPackAC>
  | ReturnType<typeof deletePackAC>
