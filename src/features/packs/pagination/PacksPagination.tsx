import React, { ChangeEvent, useEffect } from 'react'

import { Container, MenuItem, Pagination, Select, SelectChangeEvent, Stack } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { getPacksTC } from '../packsList/packs-reducer'

export const PacksPagination = () => {
  const dispatch = useAppDispatch()

  const page = useAppSelector(state => state.packs.page)
  const pageQty = useAppSelector(state => state.packs.pageQty)
  const elementsOnPage = useAppSelector(state => state.packs.pageCount)

  const [searchParams, setSearchParams] = useSearchParams()
  const pageQuery = searchParams.get('page')
  const pageCountQuery = searchParams.get('pageCount')
  const urlAllParams = Object.fromEntries(searchParams)

  const paginationHandler = (_: ChangeEvent<unknown>, num: number) => {
    setSearchParams({ ...urlAllParams, page: String(num) })
    /*dispatch(paginationTC(num))*/
  }

  const handleSelect = (e: SelectChangeEvent) => {
    setSearchParams({ ...urlAllParams, pageCount: e.target.value })
  }

  useEffect(() => {
    if (pageQuery && pageCountQuery)
      dispatch(getPacksTC(undefined, undefined, +pageQuery, undefined, +pageCountQuery))
    else setSearchParams({ page: '1', pageCount: '5' })
  }, [pageQuery, pageCountQuery])

  console.log('page: ' + page, 'pageQuery: ' + pageQuery, 'pageCount: ' + elementsOnPage)

  return (
    <Container sx={{ marginTop: 5 }} maxWidth={'md'}>
      <Stack spacing={2}>
        {!!pageQty && (
          <>
            <Pagination
              color="primary"
              shape="rounded"
              count={pageQty}
              page={page}
              onChange={paginationHandler}
              sx={{ marginY: 3, marginX: 'auto' }}
            />
            Show
            <Select
              value={String(elementsOnPage)}
              onChange={handleSelect}
              sx={{ width: '65px', height: '40px' }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
            Packs per Page
          </>
        )}
      </Stack>
    </Container>
  )
}
