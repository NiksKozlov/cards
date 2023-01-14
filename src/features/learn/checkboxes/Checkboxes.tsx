import React from 'react'

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import { BpRadio, StyledFormControlLabel } from '../../../common/styles/formControlLabel'

export const grades = ['didn`t know', 'forgot', 'thought for a long time', 'mixed up', 'knew']

type PropsType = {
  value: string
  setValue: (value: string) => void
}

export const Checkboxes = (props: PropsType) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue((event.target as HTMLInputElement).value)
  }

  return (
    <>
      <FormControl>
        <h3>Rate yourself:</h3>
        <RadioGroup value={props.value} onChange={handleChange}>
          {grades.map((g, i) => (
            <StyledFormControlLabel
              key={'grade-' + i}
              value={g}
              control={<BpRadio size={'small'} />}
              label={g}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  )
}
