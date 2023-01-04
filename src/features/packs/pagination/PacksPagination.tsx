import React, { useEffect, useState } from 'react'

import { Container, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { StyledPagination } from '../../../common/styles/paginationStyle'

import s from './PacksPagination.module.css'

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
    searchParams.set('page', String(page))
    setSearchParams(searchParams)
    setCurrentPage(page)
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
    <Container sx={{ marginTop: 3 }}>
      <div className={s.pagContainer}>
        <StyledPagination
          color="primary"
          shape="rounded"
          /*count={totalPacksCount}*/
          count={Math.ceil(totalPacksCount / packsCount)}
          page={currentPage}
          onChange={handleChangePage}
        />
        <div>Show</div>
        <Select
          value={String(packsPerPage)}
          onChange={handleChangePacksPerPage}
          sx={{ width: '70px', height: '35px', marginLeft: '10px', marginRight: '10px' }}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
        <div>Packs per Page</div>
      </div>
    </Container>
  )
}
