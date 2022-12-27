import React, { ChangeEvent, useEffect } from 'react'

import { Container, Pagination, Stack } from '@mui/material'
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

  const paginationHandler = (_: ChangeEvent<unknown>, num: number) => {
    setSearchParams({ page: String(num) })
    /*dispatch(paginationTC(num))*/
  }

  useEffect(() => {
    if (pageQuery) dispatch(getPacksTC(undefined, undefined, +pageQuery))
    else setSearchParams({ page: '1' })
  }, [pageQuery])

  console.log('page: ' + page, 'pageQuery: ' + pageQuery, 'pageQty: ' + pageQty)

  return (
    <Container sx={{ marginTop: 5 }} maxWidth={'md'}>
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            color="primary"
            shape="rounded"
            count={pageQty}
            page={page}
            onChange={paginationHandler}
            sx={{ marginY: 3, marginX: 'auto' }}
          />
        )}
      </Stack>
    </Container>
  )
}
