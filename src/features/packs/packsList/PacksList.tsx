import React, { MouseEvent, useEffect, useMemo, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import { useLocation, useSearchParams } from 'react-router-dom'

import { DomainPackType } from '../../../api/packs-api'
import noCover from '../../../assets/images/packNoCover.jpg'
import SearchField from '../../../common/components/searchField/SearchField'
import {
  cardPacksTotalCount,
  packsPageCount,
  packsPage,
  packsSelector,
  searchParamsState,
} from '../../../common/selectors/packs-selector'
import { AddNewPackModal } from '../../modals/basicPackModal/addNewPackModal/AddNewPackModal'
import { FilterSlider } from '../filterSlider/filterSlider'
import { Pack } from '../pack/Pack'
import { PacksFilterButtons } from '../packsFilterButtons/PacksFilterButtons'
import { Pagination } from '../pagination/Pagination'
import { ResetFiltersBtn } from '../resetFiltersBtn/ResetFiltersBtn'

import { changeSortPacksAC, getPacksTC, setSearchParamsAC } from './packs-reducer'
import s from './PacksList.module.css'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { StyledHeadTableCell, StyledHeadTableRow } from 'common/styles/tableStyleWrapper'

export const PacksList = () => {
  const dispatch = useAppDispatch()

  const cardPacks = useAppSelector(packsSelector)
  const currentPage = useAppSelector(packsPage)
  const packsCountState = useAppSelector(packsPageCount)
  const cardPacksTotal = useAppSelector(cardPacksTotalCount)
  // const reduxSearchParams = useAppSelector(searchParamsState)

  // const { search } = useLocation()

  const [order, setOrder] = useState('ascending')
  const [orderBy, setOrderBy] = useState('updated')

  const [searchParams, setSearchParams] = useSearchParams()

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof DomainPackType) => {
    if (property === 'user_id') return
    const ascending = order === 'ascending' && orderBy === property

    searchParams.set('sortPacks', (ascending ? 1 : 0) + property)
    setSearchParams(searchParams)

    dispatch(changeSortPacksAC((ascending ? 1 : 0) + property))
    setOrder(ascending ? 'descending' : 'ascending')
    setOrderBy(property)
  }

  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property)
  }

  const URLParams = useMemo(() => {
    const paramsSearch: any = {}

    searchParams.forEach((key, value) => {
      paramsSearch[value] = key
    })

    return paramsSearch
  }, [searchParams])

  useEffect(() => {
    dispatch(getPacksTC(URLParams))
  }, [URLParams])

  /*useEffect(() => {
    if (search) dispatch(setSearchParamsAC(search))
  }, [search])

  console.log(reduxSearchParams)

  useEffect(() => {
    if (reduxSearchParams) setSearchParams(reduxSearchParams)
  }, [])*/

  return (
    <div className={s.mainContainer}>
      <div className={s.addPack}>
        <h1>Packs list</h1>
        <AddNewPackModal />
      </div>
      <div className={s.filtersContainer}>
        <SearchField paramURL={'packName'} searchLabel={'Pack Name'} />
        <PacksFilterButtons />
        <FilterSlider />
        <ResetFiltersBtn />
      </div>
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <StyledHeadTableRow>
              <StyledHeadTableCell align="left">Cover</StyledHeadTableCell>
              <StyledHeadTableCell>
                <span className={s.sortCell} onClick={createSortHandler('name')}>
                  Name
                </span>
              </StyledHeadTableCell>
              <StyledHeadTableCell align="left" onClick={createSortHandler('cardsCount')}>
                <span className={s.sortCell} onClick={createSortHandler('cardsCount')}>
                  Cards
                </span>
              </StyledHeadTableCell>
              <StyledHeadTableCell align="left" onClick={createSortHandler('updated')}>
                <span className={s.sortCell} onClick={createSortHandler('updated')}>
                  Last Updated
                </span>
              </StyledHeadTableCell>
              <StyledHeadTableCell align="left">Created by</StyledHeadTableCell>
              <StyledHeadTableCell align="left">Actions</StyledHeadTableCell>
            </StyledHeadTableRow>
          </TableHead>
          <TableBody>
            {cardPacks?.map(p => (
              <Pack
                id={p._id}
                userId={p.user_id}
                key={p._id}
                name={p.name}
                cardsCount={p.cardsCount}
                updated={p.updated}
                created={p.user_name}
                deckCover={
                  p.deckCover && p.deckCover.includes('data:image') ? p.deckCover : noCover
                }
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Pagination
          page={currentPage}
          packsCount={packsCountState}
          totalPacksCount={cardPacksTotal}
          title={'Packs'}
        />
      </div>
    </div>
  )
}
