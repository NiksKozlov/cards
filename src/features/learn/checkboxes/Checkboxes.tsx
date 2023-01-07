import React from 'react'

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

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
        <FormLabel id="controlled-radio-buttons-group">Rate yourself:</FormLabel>
        <RadioGroup
          aria-labelledby="controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={props.value}
          onChange={handleChange}
        >
          {grades.map((g, i) => (
            <FormControlLabel
              key={'grade-' + i}
              value={g}
              control={<Radio size={'small'} />}
              label={g}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  )
}
