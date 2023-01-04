import React from 'react'

import s from '../../../cards/cardList/CardsList.module.css'
import { BasicCardModal } from '../BasicCardModal'

export const AddNewCardModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicCardModal title={'Add new card'} open={open} setOpen={setOpen} comp={'add'}>
      <button className={s.addCardBtn} onClick={handleOpen}>
        Add new card
      </button>
    </BasicCardModal>
  )
}
