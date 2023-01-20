import React from 'react'

import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { UniButton } from '../../../../common/uniComponents/uniButton/UniButton'
import { BasicCardModal } from '../BasicCardModal'

export const AddNewCardModal = () => {
  const status = useAppSelector(state => state.app.status)
  const instruction = status === 'loading'
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicCardModal title={'Add new card'} open={open} setOpen={setOpen} comp={'add'}>
      <UniButton
        className={instruction ? 'disabledAddBtn' : 'addBtn'}
        onClick={handleOpen}
        title={'Add new card'}
        disabled={instruction}
      />
    </BasicCardModal>
  )
}
