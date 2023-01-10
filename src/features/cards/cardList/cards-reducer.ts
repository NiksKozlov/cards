import { cardsAPI, CardsParamsType, CardType } from 'api/cards-api'
import { setAppStatusAC } from 'app/app-reducer'
import { AppThunk } from 'common/hooks/useAppDispatch'
import { handleServerError } from 'common/utils/error-handler/error-handler'

const initialState = {
  packId: '',
  cards: [] as CardType[],
  cardsTotalCount: null as null | number,
  maxGrade: null as null | number,
  minGrade: null as null | number,
  page: undefined as undefined | number,
  pageCount: 5,
  packUserId: null as null | number,
  whosePack: 'my' as string | 'friends' as string,
}

type InitialStateType = typeof initialState

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return { ...state, cards: action.cardsData }
    case 'CARDS/SET-PACKS-ID':
      return { ...state, packId: action.packId }
    case 'CARDS/SET-WHOSE-PACK':
      return { ...state, whosePack: action.whosePack }
    default:
      return state
  }
}

// actions
export const setCardsDataAC = (cardsData: CardType[]) =>
  ({ type: 'CARDS/SET-CARDS', cardsData } as const)
export const setPackIdAC = (packId: string) => ({ type: 'CARDS/SET-PACKS-ID', packId } as const)
export const setWhosePack = (whosePack: 'my' | 'friends') =>
  ({ type: 'CARDS/SET-WHOSE-PACK', whosePack } as const)

//thunks
export const getCardsTC =
  (searchParams?: CardsParamsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))

      const res = await cardsAPI.getCards(searchParams)

      dispatch(setCardsDataAC(res.data.cards))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export const addNewCardTC =
  (cardData: AddNewCardLocalStateType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await cardsAPI.addNewCard(cardData)

      dispatch(getCardsTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export const editCardTC =
  (cardData: EditCardLocalStateType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await cardsAPI.editCard(cardData)

      dispatch(getCardsTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export const deleteCardTC =
  (_id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await cardsAPI.deleteCard(_id)

      dispatch(getCardsTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export type AddNewCardLocalStateType = {
  card: {
    cardsPack_id: string
    question: string
    questionImg: string
    answer: string
  }
}

export type EditCardLocalStateType = {
  card: {
    _id: string
    question: string
    grade: number
    shots: number
  }
}

export type CardsActionsTypes =
  | ReturnType<typeof setCardsDataAC>
  | ReturnType<typeof setPackIdAC>
  | ReturnType<typeof setWhosePack>
