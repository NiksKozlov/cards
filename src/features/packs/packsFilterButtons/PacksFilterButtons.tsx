import React, { useEffect } from 'react'

import { ButtonGroup, List } from '@mui/material'
import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { filterPackListTC } from '../packsList/packs-reducer'

export const PacksFilterButtons = () => {
  const dispatch = useAppDispatch()

  const profileId = useAppSelector(state => state.profile._id)
  const packsFilter = useAppSelector(state => state.packs.packsFilter)

  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('user_id')

  const onMyClickHandler = () => {
    setSearchParams({ user_id: profileId })
  }
  const onAllClickHandler = () => {
    setSearchParams({})
  }

  useEffect(() => {
    if (userId) {
      dispatch(filterPackListTC(userId))
    } else {
      dispatch(filterPackListTC())
    }
  }, [userId])

  return (
    <div>
      <ButtonGroup>
        <Button
          onClick={onMyClickHandler}
          variant={packsFilter === 'My' ? 'contained' : 'outlined'}
          size={'large'}
        >
          My
        </Button>
        <Button
          onClick={onAllClickHandler}
          variant={packsFilter === 'All' ? 'contained' : 'outlined'}
          size={'large'}
        >
          All
        </Button>
      </ButtonGroup>
    </div>
  )
}
