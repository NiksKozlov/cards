import { AppRootStateType } from '../../app/store'

export const userCards = (state: AppRootStateType) => state.cards.cards
export const cardsPackId = (state: AppRootStateType) => state.cards.packId
