import React, { MouseEvent, useEffect, useMemo, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import { useSearchParams } from 'react-router-dom'

import { DomainPackType } from '../../../api/packs-api'
import {
  cardPacksTotalCount,
  packsCount,
  packsPage,
  packsSelector,
} from '../../../common/selectors/packs-selector'
import { AddNewPackModal } from '../../modals/basicPackModal/addNewPackModal/AddNewPackModal'
import { FilterSlider } from '../filterSlider/filterSlider'
import { Pack } from '../pack/Pack'
import { PacksFilterButtons } from '../packsFilterButtons/PacksFilterButtons'
import { PacksPagination } from '../pagination/PacksPagination'
import { ResetFiltersBtn } from '../resetFiltersBtn/ResetFiltersBtn'
import SearchField from '../searchField/SearchField'

import { changeSortPacksAC, getPacksTC } from './packs-reducer'
import s from './PacksList.module.css'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { StyledHeadTableCell, StyledHeadTableRow } from 'common/styles/tableStyleWrapper'

export const PacksList = () => {
  const dispatch = useAppDispatch()

  const cardPacks = useAppSelector(packsSelector)
  const pageState = useAppSelector(packsPage)
  const packsCountState = useAppSelector(packsCount)
  const cardPacksTotal = useAppSelector(cardPacksTotalCount)

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

  return (
    <div className={s.mainContainer}>
      <div className={s.addPack}>
        <h1>Packs list</h1>
        <AddNewPackModal />
      </div>
      <div className={s.filtersContainer}>
        <SearchField />
        <PacksFilterButtons />
        <FilterSlider />
        <ResetFiltersBtn />
      </div>
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <StyledHeadTableRow>
              <StyledHeadTableCell onClick={createSortHandler('name')}>Name</StyledHeadTableCell>
              <StyledHeadTableCell align="left" onClick={createSortHandler('cardsCount')}>
                Cards
              </StyledHeadTableCell>
              <StyledHeadTableCell align="left" onClick={createSortHandler('updated')}>
                Last Updated
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
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <PacksPagination
          page={pageState}
          packsCount={packsCountState}
          totalPacksCount={cardPacksTotal}
        />
      </div>
    </div>
  )
}
