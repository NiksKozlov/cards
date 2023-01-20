import React from 'react'

import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import { IconButton } from '@mui/material'

import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { BasicCardModal } from '../BasicCardModal'

type PropsType = {
  _id: string
}

export const EditCardModal = ({ _id }: PropsType) => {
  const status = useAppSelector(state => state.app.status)
  const instruction = status === 'loading'
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicCardModal title={'Edit card'} open={open} setOpen={setOpen} comp={'edit'} _id={_id}>
      <IconButton onClick={handleOpen} disabled={instruction}>
        {instruction ? (
          <ModeOutlinedIcon sx={{ color: '#bdbdbd' }} />
        ) : (
          <ModeOutlinedIcon sx={{ color: 'black' }} />
        )}
      </IconButton>
    </BasicCardModal>
  )
}
