import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'

import { Pack } from '../pack/Pack'

import { AddNewPacks } from './packListCrud/AddNewPacks'
import { getPacksTC } from './packs-reducer'
import s from './PacksList.module.css'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { StyledHeadTableCell, StyledHeadTableRow } from 'common/styles/tableStyleWrapper'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(st => st.packs.cardPacks)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  return (
    <div className={s.mainContainer}>
      <div className={s.addPack}>
        <h1 className={s.title}>Packs list</h1>
        <AddNewPacks />
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
            {packs.map(p => (
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
    </div>
  )
}
