import React, { useEffect } from 'react'

import { ButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import { useParams, useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { showPacksFilterTC } from '../packsList/packs-reducer'

export const ShowPacksFilter = () => {
  const dispatch = useAppDispatch()
  const showPacks = useAppSelector(state => state.packs.showPacks)
  const profileId = useAppSelector(state => state.profile._id)
  const packList = useAppSelector(state => state.packs.cardPacks)
  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('user_id')

  console.log('profileId ', profileId)
  const params = useParams<'user_id'>()

  const onMyClickHandler = () => {
    /*dispatch(showPacksFilterTC('My'))*/
    setSearchParams({ user_id: profileId })
  }
  const onAllClickHandler = () => {
    dispatch(showPacksFilterTC('All'))
  }

  /*useLayoutEffect(() => {
    setSearchParams({ user_id: 'TEST' })
  }, [])*/

  useEffect(() => {
    console.log('render')
    if (userId) {
      dispatch(showPacksFilterTC('My'))
    }
  }, [userId])

  return (
    <div>
      <ButtonGroup>
        <Button
          onClick={onMyClickHandler}
          variant={showPacks === 'My' ? 'contained' : 'outlined'}
          size={'large'}
        >
          My
        </Button>
        <Button
          onClick={onAllClickHandler}
          variant={showPacks === 'All' ? 'contained' : 'outlined'}
          size={'large'}
        >
          All
        </Button>
      </ButtonGroup>
      {packList.map(p => p.user_id + '--------')}
    </div>
  )
}
