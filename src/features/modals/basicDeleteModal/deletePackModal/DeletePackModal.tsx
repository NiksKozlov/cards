import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import { IconButton } from '@mui/material'

import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { UniButton } from '../../../../common/uniComponents/uniButton/UniButton'
import { BasicDeleteModal } from '../BasicDeleteModal'

type PropsType = {
  id: string
  name: string
  select?: boolean
  title?: string
}

export const DeletePackModal = ({ id, name, select, title }: PropsType) => {
  const status = useAppSelector(state => state.app.status)
  const instruction = status === 'loading'
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicDeleteModal
      title={'Delete Pack'}
      comp={'delPack'}
      id={id}
      name={name}
      open={open}
      setOpen={setOpen}
    >
      {select ? (
        <UniButton onClick={handleOpen} className={'selectBtn'}>
          <DeleteOutlinedIcon sx={{ color: 'black', paddingRight: 1 }} />
          {title}
        </UniButton>
      ) : (
        <IconButton onClick={handleOpen} disabled={instruction}>
          {instruction ? (
            <DeleteOutlinedIcon sx={{ color: '#bdbdbd' }} />
          ) : (
            <DeleteOutlinedIcon sx={{ color: 'black' }} />
          )}
        </IconButton>
      )}
    </BasicDeleteModal>
  )
}
