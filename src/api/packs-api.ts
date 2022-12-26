import { CardPacksType } from '../features/packs/packsList/packs-reducer'

import { instance } from './instance'

export const packsAPI = {
  getPacks(params: PacksParamsType) {
    return instance.get<PacksResponseType>('cards/pack', {
      params,
    })
  },
}

export type PacksParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number

  user_id?: string

  block?: boolean
}

type PacksResponseType = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}
