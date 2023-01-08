import React, { ChangeEvent, memo, KeyboardEvent, useState } from 'react'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton } from '@mui/material'
import TextField from '@mui/material/TextField'

type EditableNamePropsType = {
  name: string
  onChange: (newName: string) => void
}

export const EditableName = memo(function (props: EditableNamePropsType) {
  let [editMode, setEditMode] = useState(false)
  let [name, setName] = useState(props.name)

  const activateEditMode = () => {
    setEditMode(true)
    setName(props.name)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(name)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const enterChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateViewMode()
    }
  }

  return editMode ? (
    <TextField
      type={'search'}
      value={name}
      label={'NickName'}
      variant={'standard'}
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewMode}
      onKeyDown={enterChangeTitle}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>
      {props.name}
      <IconButton onClick={activateEditMode}>
        <EditOutlinedIcon fontSize={'small'} />
      </IconButton>
    </span>
  )
})
