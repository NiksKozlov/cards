import { AxiosResponse } from 'axios'

import { CardPacksType } from '../features/packs/packsList/packs-reducer'

import { instance } from './instance'

export const packsAPI = {
  getPacksList(queryParams: PacksParamsType) {
    return instance.get<'', AxiosResponse<GetPacksResponseType>, PacksParamsType>('cards/pack', {
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

type GetPacksResponseType = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
}
