import React, { ChangeEvent, memo, useState } from 'react'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton } from '@mui/material'
import TextField from '@mui/material/TextField'

type EditableNamePropsType = {
  name: string
  onChange: (newName: string) => void
}

export const EditableName = memo(function (props: EditableNamePropsType) {
  console.log('EditableName called')
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

  return editMode ? (
    <TextField value={name} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>
      {props.name}
      <IconButton onClick={activateEditMode}>
        <EditOutlinedIcon />
      </IconButton>
    </span>
  )
})
