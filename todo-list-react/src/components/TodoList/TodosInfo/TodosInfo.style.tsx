import { styled } from '@mui/material/styles'
import { ThemePalette } from '../../../theme/palette'

interface MuiTheme {
  palette?: ThemePalette | undefined
}

export const StyledTodosInfo = styled((props: any) => <div {...props} />)(
  () => {
    return {
      padding: '20px',
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
    }
  }
)

export const StyledTodosInfoStatus = styled((props: any) => <div {...props} />)(
  ({ theme }) => {
    const { palette }: MuiTheme = theme

    return {
      display: 'flex',
      gap: '15px',
      ':hover': {
        color: palette?.common.black,
        cursor: 'pointer',
      },
    }
  }
)

export const StyledDeleteCompletedTodos = styled((props: any) => (
  <button {...props} />
))(({ theme }) => {
  const { palette }: MuiTheme = theme

  return {
    color: palette?.secondary.accentLine,
    ':hover': {
      color: palette?.common.black,
      cursor: 'pointer',
    },
  }
})
