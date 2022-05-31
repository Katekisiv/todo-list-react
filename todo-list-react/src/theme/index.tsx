import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import palette from './palette'
import GlobalStyles from './globalStyles'

interface Props {
  children?: React.ReactNode
}

const ThemeConfig = ({ children }: Props) => {
  const theme = createTheme({
    palette,
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            padding: 0,
            '::placeholder': {
              color: 'rgb(118, 118, 118)',
              opacity: 1,
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default ThemeConfig
