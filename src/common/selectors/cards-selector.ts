import { AppRootStateType } from '../../app/store'

export const userCards = (state: AppRootStateType) => state.cards.cards

export const cardsPage = (state: AppRootStateType) => state.cards.page

export const cardsPageCount = (state: AppRootStateType) => state.cards.pageCount

export const cardsTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount
