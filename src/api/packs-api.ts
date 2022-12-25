import { AxiosResponse } from 'axios'

import { CardPacksType } from '../features/packs/packsList/packs-reducer'

import { instance } from './instance'

export const packsAPI = {
  getPacks(queryParams: PacksParamsType) {
    return instance.get<PacksResponseType>('cards/pack', {
      params: queryParams,
    })
  },
}

//types
type PacksParamsType = {
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
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
}
