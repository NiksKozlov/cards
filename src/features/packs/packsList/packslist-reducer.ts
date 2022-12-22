import { packsAPI } from '../../../api/packs-api'
import { AppThunk } from '../../../common/hooks/useAppDispatch'

const cardsPackInitialState = {
  name: '',
  deckCover: '',
  private: false,
}

const initialState = {
  cardsPack: cardsPackInitialState,
}

type CardsPackInitialStateType = typeof cardsPackInitialState
type InitialStateType = typeof initialState

export const packsListReducer = (
  state: InitialStateType = initialState,
  action: PacksListActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'PACKSLIST/ADD-NEW-PACK':
      return {
        ...state,
        cardsPack: {
          ...state.cardsPack,
          name: action.packData.name,
          deckCover: action.packData.name,
          private: action.packData.private,
        },
      }
    default:
      return state
  }
}

// Actions
export const addNewPackAC = (packData: CardsPackInitialStateType) =>
  ({ type: 'PACKSLIST/ADD-NEW-PACK', packData } as const)

// Thunks
export const addNewPackTC =
  (packData: InitialStateType): AppThunk =>
  async dispatch => {
    try {
      const res = await packsAPI.addNewPack(packData)

      dispatch(addNewPackAC(res.data.newCardsPack))
    } catch (e) {
      console.log('error: ', e)
    }
  }

// Types
export type PacksListActionsTypes = ReturnType<typeof addNewPackAC>
