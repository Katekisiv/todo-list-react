import { styled } from '@mui/material/styles'
import { ThemePalette } from '../../theme/palette'
import { List } from '@mui/material'

interface MuiTheme {
  palette?: ThemePalette | undefined
}

export const StyledTodos = styled((props: any) => <section {...props} />)(
  ({ theme }) => {
    const { palette }: MuiTheme = theme

    return {
      marginTop: '10px',
      marginBottom: '20px',
      backgroundColor: palette?.common.white,
      borderRadius: '10px',
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    }
  }
)

export const StyledTodoList = styled((props: any) => <List {...props} />)(
  () => {
    return {
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: 0,
      paddingBottom: 0,
    }
  }
)
