import React from 'react'

import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import { IconButton } from '@mui/material'

import { UniButton } from '../../../../common/uniComponents/uniButton/UniButton'
import { BasicPackModal } from '../BasicPackModal'

type PropsType = {
  id: string
  title?: string
  select?: boolean
}

export const EditPackModal = ({ id, title, select }: PropsType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicPackModal title={'Edit pack'} open={open} setOpen={setOpen} id={id} comp={'edit'}>
      {select ? (
        <UniButton onClick={handleOpen} className={'selectBtn'}>
          <ModeOutlinedIcon sx={{ color: 'black', paddingRight: 1 }} />
          {title}
        </UniButton>
      ) : (
        <IconButton onClick={handleOpen}>
          <ModeOutlinedIcon sx={{ color: 'black' }} />
        </IconButton>
      )}
    </BasicPackModal>
  )
}
