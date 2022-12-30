import React, { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { DomainPackType } from '../../../api/packs-api'
import { userID } from '../../profile/user-selector'
import { Pack } from '../pack/Pack'
import { PacksFilterButtons } from '../packsFilterButtons/PacksFilterButtons'
import { PacksPagination } from '../pagination/PacksPagination'
import { ResetButton } from '../resetButton/ResetButton'
import SearchField from '../searchField/SearchField'

import { AddNewPacks } from './packListCrud/AddNewPacks'
import {
  changePageCountAC,
  changeSortPacksAC,
  deletePackTC,
  editPackTC,
  getPacksTC,
} from './packs-reducer'
import { cardPacksTotalCount, packsCount, packsPage, packsSelector } from './packs-selector'
import s from './PacksList.module.css'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { StyledHeadTableCell, StyledHeadTableRow } from 'common/styles/tableStyleWrapper'

export const PacksList = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const cardPacks = useAppSelector(packsSelector)
  const pageState = useAppSelector(packsPage)
  const packsCountState = useAppSelector(packsCount)
  const cardPacksTotal = useAppSelector(cardPacksTotalCount)
  const userId = useAppSelector(userID)

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

  const handleChangePacksPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const ev = event.target.value

    searchParams.set('pageCount', ev)
    setSearchParams(searchParams)
    dispatch(changePageCountAC(+ev))
  }

  const URLParams = useMemo(
    () => ({
      packName: searchParams.get('packName') || undefined,
      page: Number(searchParams.get('page')) || undefined,
      pageCount: Number(searchParams.get('pageCount')) || undefined,
      min: Number(searchParams.get('min')) || undefined,
      max: Number(searchParams.get('max')) || undefined,
      sortPacks: searchParams.get('sortPacks') || undefined,
      user_id: searchParams.get('belonging') === 'my' ? userId : undefined,
    }),
    [searchParams]
  )

  useEffect(() => {
    dispatch(getPacksTC(URLParams))
  }, [URLParams])

  /*const packElement = cardPacks
  
    const handleClick = (packId: string) => {
      navigate(`/packs/${packId}`)
    }
  
    const deletePack = (id: string) => {
      dispatch(deletePackTC(id))
    }
  
    const updatePack = (_id: string, name: string) => {
      let newName = 'NEW NAME'
  
      dispatch(editPackTC({ cardsPack: { _id, name } }))
    }*/

  return (
    <div className={s.mainContainer}>
      <div className={s.addPack}>
        <h1 className={s.title}>Packs list</h1>
        <AddNewPacks />
      </div>
      <div className={s.filtersContainer}>
        <SearchField />
        <PacksFilterButtons />
        <ResetButton />
      </div>
      <div></div>
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <StyledHeadTableRow>
              <StyledHeadTableCell>Name</StyledHeadTableCell>
              <StyledHeadTableCell align="left">Cards</StyledHeadTableCell>
              <StyledHeadTableCell align="left">Last Updated</StyledHeadTableCell>
              <StyledHeadTableCell align="left">Created by</StyledHeadTableCell>
              <StyledHeadTableCell align="left">Actions</StyledHeadTableCell>
            </StyledHeadTableRow>
          </TableHead>
          <TableBody>
            {cardPacks.map(p => (
              <Pack
                id={p._id}
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
