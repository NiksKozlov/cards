import React, { ChangeEvent, useEffect, useState } from 'react'

import { Container, MenuItem, Pagination, Select, SelectChangeEvent, Stack } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { getPacksTC } from '../packsList/packs-reducer'

type PropsType = {
  page: number
  packsCount: number
  totalPacksCount: number
}

export const PacksPagination: React.FC<PropsType> = ({ page, packsCount, totalPacksCount }) => {
  const [packsPerPage, setPacksPerPage] = useState<number>(4)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangePage = (event: unknown, page: number) => {
    const newPage = page + 1

    searchParams.set('page', String(newPage))
    setSearchParams(searchParams)
    setCurrentPage(newPage)
  }

  const handleChangePacksPerPage = (event: SelectChangeEvent) => {
    const ev = event.target.value

    searchParams.set('pageCount', ev)
    setSearchParams(searchParams)
    setPacksPerPage(+ev)
  }

  useEffect(() => {
    if (searchParams.get('page')) {
      const pageParams = Number(searchParams.get('page'))

      setCurrentPage(pageParams)
    } else {
      setCurrentPage(page)
    }
    if (searchParams.get('pageCount')) {
      const pageCountParam = Number(searchParams.get('pageCount'))

      setPacksPerPage(pageCountParam)
    } else {
      setPacksPerPage(packsPerPage)
    }
  }, [searchParams, packsPerPage, page])

  return (
    <Container sx={{ marginTop: 5 }} maxWidth={'md'}>
      <Stack spacing={2}>
        <Pagination
          color="primary"
          shape="rounded"
          count={totalPacksCount || 0}
          page={page}
          onChange={handleChangePage}
          sx={{ marginY: 3, marginX: 'auto' }}
        />
        Show
        <Select
          value={String(packsPerPage)}
          onChange={handleChangePacksPerPage}
          sx={{ width: '65px', height: '40px' }}
        >
          <MenuItem value={4}>5</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
        Packs per Page
      </Stack>
    </Container>
  )
}
