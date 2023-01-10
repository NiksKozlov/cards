import React, { useEffect, useMemo } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { BackToPacksList } from '../../../common/components/backToPacksList/BackToPacksList'
import SearchField from '../../../common/components/searchField/SearchField'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import {
  cardsPage,
  cardsPageCount,
  cardsTotalCount,
} from '../../../common/selectors/cards-selector'
import { StyledHeadTableCell, StyledHeadTableRow } from '../../../common/styles/tableStyleWrapper'
import { AddNewCardModal } from '../../modals/basicCardModal/addNewCardModal/AddNewCardModal'
import { Pagination } from '../../packs/pagination/Pagination'
import { Card } from '../card/Card'

import { getCardsTC } from './cards-reducer'
import s from './CardsList.module.css'

export const CardsList = () => {
  const dispatch = useAppDispatch()

  const cards = useAppSelector(st => st.cards.cards)
  const currentPage = useAppSelector(cardsPage)
  const cardsPageCountState = useAppSelector(cardsPageCount)
  const cardsTotal = useAppSelector(cardsTotalCount)

  const { packId } = useParams()
  const [searchParams] = useSearchParams()

  const URLParams = useMemo(() => {
    const paramsSearch: any = {
      cardsPack_id: packId,
    }

    searchParams.forEach((key, value) => {
      paramsSearch[value] = key
    })

    return paramsSearch
  }, [searchParams])

  useEffect(() => {
    dispatch(getCardsTC(URLParams))
  }, [URLParams])

  return (
    <div className={s.mainContainer}>
      <BackToPacksList />
      <div className={s.addCard}>
        <h1>Cards list</h1>
        <AddNewCardModal />
      </div>
      <SearchField paramURL={'cardQuestion'} searchLabel={'Card Question'} />
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
            {cards?.map(c => (
              <Card
                key={c._id}
                question={c.question}
                questionImg={c.questionImg ? c.questionImg : ''}
                answer={c.answer}
                updated={c.updated}
                grade={c.grade}
                _id={c._id}
                user_id={c.user_id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Pagination
          page={currentPage}
          packsCount={cardsPageCountState}
          totalPacksCount={cardsTotal}
          title={'Cards'}
        />
      </div>
    </div>
  )
}
