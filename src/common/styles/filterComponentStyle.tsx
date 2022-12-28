import { styled, TextField } from '@mui/material'

export const StyledTextField = styled(TextField)(() => ({
  '&.MuiTextField-root': {
    minHeight: '60px',
  },
}))
