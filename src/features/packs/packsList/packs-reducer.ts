import { packsAPI } from '../../../api/packs-api'
import { setAppStatusAC } from '../../../app/app-reducer'
import { AppThunk } from '../../../common/hooks/useAppDispatch'
import { handleServerError } from '../../../common/utils/error-handler/error-handler'

import { AddNewPackLocalStateType } from './packsListCrud/AddNewPack'
import { EditPackLocalStateType } from './packsListCrud/EditPack'

export type CardPacksType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: Date
  updated: Date
  user_name: string
  deckCover: string
  private: boolean
}

const initialState = {
  packsFilter: '' as FilterType,
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: null as null | number,
  maxCardsCount: null as null | number,
  minCardsCount: null as null | number,
  // page: undefined as undefined | number,
  page: 1,
  pageCount: 5,
  pageQty: null as null | number,
}

type InitialStateType = typeof initialState

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS-FILTER':
      return { ...state, packsFilter: action.value }
    case 'PACKS/SET-PACKS-LIST':
      return { ...state, cardPacks: action.packsList }
    case 'PACKS/SET-PAGE':
      return { ...state, page: action.page }
    case 'PACKS/SET-PAGE-COUNT':
      return { ...state, pageCount: action.pageCount }
    case 'PACKS/SET-PAGE-QTY':
      return { ...state, pageQty: action.pageQty }
    case 'PACKS/ADD-NEW-PACK':
      console.log('ADD-NEW-PACK')
      // console.log(action.packData.name)

      return { ...state, cardPacks: state.cardPacks.map(el => ({ ...el })) }

    // name: action.packData.name,
    // deckCover: action.packData.name,
    // private: action.packData.private,

    // name: action.packData.name,
    // deckCover: action.packData.name,
    // private: action.packData.private,

    case 'PACKS/EDIT-PACK':
      console.log('EDIT-PACK')

      return { ...state, cardPacks: state.cardPacks.map(el => ({ ...el })) }

    // return {
    //   ...state,
    //   _id: action.packData._id,
    //   name: action.packData.name,
    // }
    // case 'PACKS/DELETE-PACK':
    //   console.log('Pack Deleted')
    //   console.log(state)
    //
    //   return state
    default:
      return state
  }
}

// actions
export const setPacksFilterAC = (value: FilterType) =>
  ({ type: 'PACKS/SET-PACKS-FILTER', value } as const)
export const setPacksListAC = (packsList: CardPacksType[]) =>
  ({ type: 'PACKS/SET-PACKS-LIST', packsList } as const)
export const setPageAC = (page: number) => ({ type: 'PACKS/SET-PAGE', page } as const)
export const setPageCountAC = (pageCount: number) =>
  ({ type: 'PACKS/SET-PAGE-COUNT', pageCount } as const)
export const setPageQtyAC = (pageQty: number) => ({ type: 'PACKS/SET-PAGE-QTY', pageQty } as const)

export const addNewPackAC = (packData: InitialStateType) =>
  ({ type: 'PACKS/ADD-NEW-PACK', packData } as const)

export const editPackAC = (packData: InitialStateType) =>
  ({ type: 'PACKS/EDIT-PACK', packData } as const)

// export const deletePackAC = (packData: InitialStateType) =>
//   ({ type: 'PACKS/DELETE-PACK', packData } as const)

//thunks
export const getPacksTC =
  (
    filter?: FilterType,
    profileId?: string,
    page?: number,
    packName?: string,
    pageCount?: number
  ): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const params: ParamsType = {}

      if (profileId) params.user_id = profileId
      if (page) params.page = page
      if (packName) params.packName = packName
      if (pageCount) params.pageCount = pageCount

      const res = await packsAPI.getPacks(params)

      if (filter) dispatch(setPacksFilterAC(filter))
      if (page) dispatch(setPageAC(res.data.page))
      if (pageCount) dispatch(setPageCountAC(res.data.pageCount))
      if (pageCount) dispatch(setPageQtyAC(Math.ceil(res.data.cardPacksTotalCount / pageCount)))

      dispatch(setPacksListAC(res.data.cardPacks))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

// export const addNewPackTC =
//   (packData: AddNewPackLocalStateType): AppThunk =>
//   async dispatch => {
//     try {
//       const res = await packsAPI.addNewPack(packData)
//
//       dispatch(addNewPackAC(res.data.newCardsPack))
//     } catch (e) {
//       console.log('error: ', e)
//     }
//   }
//
// export const editPackTC =
//   (packData: EditPackLocalStateType): AppThunk =>
//   async dispatch => {
//     try {
//       const res = await packsAPI.editPack(packData)
//
//       dispatch(editPackAC(res.data.updatedCardsPack))
//     } catch (e) {
//       console.log('error: ', e)
//     }
//   }

export const deletePackTC =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      await packsAPI.deletePack(id)

      dispatch(getPacksTC())
    } catch (e) {
      console.log('error: ', e)
    }
  }

type ParamsType = {
  filter?: FilterType | undefined
  user_id?: string | undefined
  page?: number | undefined
  pageCount?: number | undefined
  packName?: string | undefined
}

type FilterType = 'My' | 'All'

export type PacksActionsTypes =
  | ReturnType<typeof setPacksFilterAC>
  | ReturnType<typeof setPacksListAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setPageQtyAC>
  | ReturnType<typeof addNewPackAC>
  | ReturnType<typeof editPackAC>
