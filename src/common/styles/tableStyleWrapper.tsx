import { styled } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

export const StyledBodyTableRow = styled(TableRow)(() => ({
  '&.MuiTableRow-root': {
    height: '50px',
  },
}))

export const StyledBodyTableCell = styled(TableCell)(() => ({
  '&.MuiTableCell-root': {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '16px',
  },
}))

export const StyledHeadTableRow = styled(TableRow)(() => ({
  '&.MuiTableRow-root': {
    height: '50px',
    backgroundColor: '#EFEFEF',
  },
}))

export const StyledHeadTableCell = styled(TableCell)(() => ({
  '&.MuiTableCell-root': {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '17px',
  },
}))
