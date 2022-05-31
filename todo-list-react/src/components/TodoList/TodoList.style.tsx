import { styled } from '@mui/material/styles'
import { List } from '@mui/material'
import { MuiListProps, SectionProps } from '../../constants/types'

export const StyledTodos = styled((props: SectionProps) => (
  <section {...props} />
))`
  background-color: ${(props) => props.theme.palette.common.white};
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export const StyledTodoList = styled((props: MuiListProps) => (
  <List {...props} />
))`
  display: flex;
  flex-wrap: wrap;
  padding-top: 0;
  padding-bottom: 0;
`
