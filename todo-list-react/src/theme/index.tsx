import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import palette from './palette'
import GlobalStyles from './globalStyles'

interface Props {
  children?: React.ReactNode
}

const ThemeConfig = ({ children }: Props) => {
  const theme = createTheme({ palette })

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default ThemeConfig
