import React, { MouseEvent, useEffect, useMemo, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { DomainPackType } from '../../../api/packs-api'
import { ArrowDropIcon } from '../../../common/components/arrowDropIcon/ArrowDropIcon'
import { BackToPacksList } from '../../../common/components/backToPacksList/BackToPacksList'
import { Pagination } from '../../../common/components/pagination/Pagination'
import SearchField from '../../../common/components/searchField/SearchField'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import {
  cardsPage,
  cardsPageCount,
  cardsTotalCount,
} from '../../../common/selectors/cards-selector'
import { StyledHeadTableCell, StyledHeadTableRow } from '../../../common/styles/tableStyleWrapper'
import { UniButton } from '../../../common/uniComponents/uniButton/UniButton'
import { AddNewCardModal } from '../../modals/basicCardModal/addNewCardModal/AddNewCardModal'
import { PackSelector } from '../../packs/packSelector/PackSelector'
import { changeSortPacksAC } from '../../packs/packsList/packs-reducer'
import { Card } from '../card/Card'

import { getCardsTC } from './cards-reducer'
import s from './CardsList.module.css'

export const CardsList = () => {
  const dispatch = useAppDispatch()

  const cards = useAppSelector(st => st.cards.cards)
  const currentPage = useAppSelector(cardsPage)
  const cardsPageCountState = useAppSelector(cardsPageCount)
  const cardsTotal = useAppSelector(cardsTotalCount)
  const authUserId = useAppSelector(st => st.profile._id)
  const navigate = useNavigate()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('updated')

  const whosePack = cards && cards[0]?.user_id === authUserId ? 'my' : 'all'

  const { packId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof DomainPackType) => {
    const isAscending = order === 'asc' && orderBy === property

    searchParams.set('sortCards', (isAscending ? 1 : 0) + property)
    setSearchParams(searchParams)

    dispatch(changeSortPacksAC((isAscending ? 1 : 0) + property))
    setOrder(isAscending ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property)
  }

  const sortParam = searchParams.get('sortCards')
  const sortGrade = sortParam === '0grade' || sortParam === '1grade'
  const sortUpdated = sortParam === '0updated' || sortParam === '1updated'

  const runLearn = () => {
    navigate(`/learn/${packId}`)
  }

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
      {cards?.length !== 0 ? (
        <>
          <div className={s.addCard}>
            {whosePack === 'my' ? (
              <div className={s.titleContainer}>
                <h1>My pack</h1>
                <PackSelector />
              </div>
            ) : (
              <h1>{"Friend's Pack"}</h1>
            )}
            {whosePack === 'my' ? (
              <AddNewCardModal />
            ) : (
              <UniButton className={'learnBtn'} title={'Learn to pack'} onClick={runLearn} />
            )}
          </div>
          <SearchField paramURL={'cardQuestion'} searchLabel={'Card Question'} fullwidth={true} />
          <TableContainer component={Paper} className={s.tableContainer}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <StyledHeadTableRow>
                  <StyledHeadTableCell>Question</StyledHeadTableCell>
                  <StyledHeadTableCell align="center">Answer</StyledHeadTableCell>
                  <StyledHeadTableCell align="center">
                    <span className={s.sortCell} onClick={createSortHandler('updated')}>
                      Last Updated
                      {sortUpdated ? (
                        <ArrowDropIcon sortParam={sortParam as string} ascending={'1updated'} />
                      ) : null}
                    </span>
                  </StyledHeadTableCell>
                  <StyledHeadTableCell align="center">
                    <span className={s.sortCell} onClick={createSortHandler('grade')}>
                      Grade
                      {sortGrade ? (
                        <ArrowDropIcon sortParam={sortParam as string} ascending={'1grade'} />
                      ) : null}
                    </span>
                  </StyledHeadTableCell>
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
        </>
      ) : (
        <>
          <span className={s.span}>This pack is empty. Click add new card to fill this pack</span>
          <AddNewCardModal />
        </>
      )}
    </div>
  )
}
