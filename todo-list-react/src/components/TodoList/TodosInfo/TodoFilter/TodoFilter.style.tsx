import { styled } from '@mui/material/styles'
import { ThemePalette } from '../../../../theme/palette'

interface MuiTheme {
  palette?: ThemePalette | undefined
}

export const StyledTodoFilter = styled((props: any) => <span {...props} />)(
  ({ theme, selected }) => {
    const { palette }: MuiTheme = theme

    return {
      textTransform: 'capitalize',
      color: selected ? palette?.accent.main : palette?.secondary.accentLine,
      ':hover': {
        color: selected ? palette?.accent.main : palette?.secondary.accentLine,
      },
    }
  }
)
