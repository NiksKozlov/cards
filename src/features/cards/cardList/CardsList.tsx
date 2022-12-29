import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { StyledHeadTableCell, StyledHeadTableRow } from '../../../common/styles/tableStyleWrapper'
import { Card } from '../card/Card'

import { AddNewCard } from './cardListCrud/AddNewCard'
import { getCardsTC } from './cards-reducer'
import s from './CardsList.module.css'

export const CardsList = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(st => st.cards.cards)
  const packId = useAppSelector(st => st.cards.packId)

  console.log(packId)

  // useEffect(() => {
  //   dispatch(getCardsTC(packId))
  // }, [])

  const getCardsHandler = () => {
    dispatch(getCardsTC(packId))
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.addCard}>
        <h1 className={s.title}>Cards list</h1>
        <AddNewCard />
      </div>
      <button onClick={getCardsHandler}>get cards</button>
      <div></div>
      <TableContainer component={Paper} className={s.tableContainer}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <StyledHeadTableRow>
              <StyledHeadTableCell>Question</StyledHeadTableCell>
              <StyledHeadTableCell align="center">Answer</StyledHeadTableCell>
              <StyledHeadTableCell align="center">Last Updated</StyledHeadTableCell>
              <StyledHeadTableCell align="center">Grade</StyledHeadTableCell>
              <StyledHeadTableCell align="center">Actions</StyledHeadTableCell>
            </StyledHeadTableRow>
          </TableHead>
          <TableBody>
            {cards.map(c => (
              <Card
                key={c._id}
                question={c.question}
                answer={c.answer}
                updated={c.updated}
                grade={c.grade}
                _id={c._id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
