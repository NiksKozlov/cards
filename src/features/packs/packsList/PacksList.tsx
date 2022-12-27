import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { StyledHeadTableCell, StyledHeadTableRow } from '../../../common/styles/tableStyleWrapper'
import { Pack } from '../pack/Pack'

import { getPacksTC } from './packs-reducer'
import s from './PacksList.module.css'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(st => st.packs.cardPacks)
  const isLoggedIn = useAppSelector(st => st.auth.isLoggedIn)

  console.log(packs)

  const getCardsHandler = () => {
    dispatch(getPacksTC())
  }

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     debugger
  //     dispatch(getPacksTC())
  //   }
  // }, [])

  return (
    <div className={s.mainContainer}>
      <div className={s.addPack}>
        <h1 className={s.title}>Packs list</h1>
        <button className={s.addPackBtn}>Add new pack</button>
      </div>
      <button onClick={getCardsHandler}>get packs</button>
      <div></div>
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <StyledHeadTableRow>
              <StyledHeadTableCell>Name</StyledHeadTableCell>
              <StyledHeadTableCell align="right">Cards</StyledHeadTableCell>
              <StyledHeadTableCell align="right">Last Updated</StyledHeadTableCell>
              <StyledHeadTableCell align="right">Created by</StyledHeadTableCell>
              <StyledHeadTableCell align="right">Actions</StyledHeadTableCell>
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
