import React, { MouseEvent, useEffect, useMemo, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import { useSearchParams } from 'react-router-dom'

import { DomainPackType } from '../../../api/packs-api'
import { userID } from '../../profile/user-selector'
import { FilterSlider } from '../filterSlider/filterSlider'
import { Pack } from '../pack/Pack'
import { PacksFilterButtons } from '../packsFilterButtons/PacksFilterButtons'
import { PacksPagination } from '../pagination/PacksPagination'
import { ResetFiltersBtn } from '../resetFiltersBtn/ResetFiltersBtn'
import SearchField from '../searchField/SearchField'

import { AddNewPacks } from './packListCrud/AddNewPacks'
import { changeSortPacksAC, getPacksTC } from './packs-reducer'
import { cardPacksTotalCount, packsCount, packsPage, packsSelector } from './packs-selector'
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

  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property)
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

  return (
    <div className={s.mainContainer}>
      <div className={s.addPack}>
        <h1 className={s.title}>Packs list</h1>
        <AddNewPacks />
      </div>
      <div className={s.filtersContainer}>
        <SearchField />
        <PacksFilterButtons />
        {/*<ResetButton />*/}
        <ResetFiltersBtn />
      </div>
      <div>
        <FilterSlider />
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

/*const URLParams = useMemo(() => {
      const paramsSearch: any = {}
  
      searchParams.forEach((key, value) => {
        paramsSearch[value] = key
      })
  
      return paramsSearch
    }, [searchParams])
  
    useEffect(() => {
      let orderParam = searchParams.get('sortPacks')
  
      if (orderParam) {
        setOrderBy(orderParam.substring(1) as keyof DomainPackType)
        setOrder(Number(orderParam.at(0)) ? 'ascending' : 'descending')
      }
    }, [searchParams, order, orderBy])*/

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

/*return (
        <div>
          <PacksHeader />
          <Paper sx={{ width: '100%', overflow: 'hidden', mt: '60px' }}>
            <TableContainer sx={{ maxHeight: 840 }}>
              <Table stickyHeader aria-label="sticky table">
                <EnhancedTableHead
                  columnsHead={columns}
                  onRequestSort={handleRequestSort}
                  order={order}
                  orderBy={orderBy.toString()}
                  rowCount={packsCards?.length}
                />
    
                <TableBody>
                  {cardPacks?.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`
    
                    return (
                      <TableRow hover tabIndex={-1} key={row._id}>
                        <StyledTableCell
                          id={labelId}
                          scope="row"
                          onClick={() => handleClick(row._id)}
                          sx={{ cursor: 'pointer', wordWrap: 'break-word' }}
                        >
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.cardsCount}</StyledTableCell>
                        {/!*!/ new Date(updated).toLocaleDateString()*!/}
                        <StyledTableCell align="left">
                          {new Date(row.updated).toLocaleDateString()}
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.user_name}</StyledTableCell>
                        <StyledTableCell align="left">
                          {row.user_id === userIdLogin ? (
                            <div>
                              <IconButton disabled={row.cardsCount === 0} href={`#${PATH.LEARN}`}>
                                <SchoolOutlinedIcon fontSize={'small'} />
                              </IconButton>
                              <EditPackIcon id_pack={row._id} packName={row.name} />
                              <DeleteModalIcon
                                titleName={'Delete Pack'}
                                id_pack={row._id}
                                name={row.name}
                              />
                            </div>
                          ) : (
                            <div>
                              <IconButton disabled={row.cardsCount === 0}>
                                <SchoolOutlinedIcon fontSize={'small'} />
                              </IconButton>
                            </div>
                          )}
                        </StyledTableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <div>
            <PacksPagination
              page={pageState}
              packsCount={packsCountState}
              totalPacksCount={cardPacksTotal}
            />
          </div>
        </div>
      )
    }*/
