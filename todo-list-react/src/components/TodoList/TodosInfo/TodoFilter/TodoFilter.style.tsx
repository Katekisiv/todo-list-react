import { styled } from '@mui/material/styles'
import { SpanProps } from '../../../../constants/types'

export const StyledTodoFilter = styled(
  (props: SpanProps & { selected: boolean }) => <span {...props} />
)`
  text-transform: capitalize;
  color: ${(props) =>
    props.selected
      ? props.theme.palette.accent.main
      : props.theme.palette.secondary.accentLine};

  :hover {
    color: ${(props) =>
      props.selected
        ? props.theme.palette.accent.main
        : props.theme.palette.secondary.accentLine};
  }
`
