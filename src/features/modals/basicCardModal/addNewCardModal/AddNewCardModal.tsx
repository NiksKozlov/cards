import React from 'react'

import { UniButton } from '../../../../common/uniComponents/uniButton/UniButton'
import { BasicCardModal } from '../BasicCardModal'

export const AddNewCardModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicCardModal title={'Add new card'} open={open} setOpen={setOpen} comp={'add'}>
      <UniButton className={'addBtn'} onClick={handleOpen} title={'Add new card'} />
    </BasicCardModal>
  )
}
