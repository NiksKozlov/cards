import { AppRootStateType } from '../../app/store'

export const packsSelector = (state: AppRootStateType) => state.packs.cardPacks

export const packsPage = (state: AppRootStateType) => state.packs.page

export const packsPageCount = (state: AppRootStateType) => state.packs.pageCount

export const cardPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount

export const minCardsCount = (state: AppRootStateType) => state.packs.minCardsCount

export const maxCardsCount = (state: AppRootStateType) => state.packs.maxCardsCount

export const sortPacks = (state: AppRootStateType) => state.packs.sortPacks

export const myAllFilter = (state: AppRootStateType) => state.packs.filter

export const searchParamsState = (state: AppRootStateType) => state.packs.searchParams
