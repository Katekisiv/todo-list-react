import { styled } from '@mui/material/styles'
import { MuiListItemProps, MuiListProps } from '../../constants/types'
import { List, ListItem } from '@mui/material'

export const StyledPagination = styled((props: MuiListProps) => (
  <List {...props} />
))`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  padding-top: 0;
  padding-bottom: 0;
`

export const StyledPaginationButton = styled((props: MuiListItemProps) => (
  <ListItem {...props} />
))`
  width: auto;
  padding: 5px 20px;
  border: 1px solid ${(props) => props.theme.palette.secondary.line};
  border-top: none;
  overflow-x: auto;
  color: ${(props) =>
    props.selected
      ? props.theme.palette.accent.main
      : props.theme.palette.secondary.accentLine};

  :hover {
    cursor: pointer;
    color: ${(props) => props.theme.palette.common.black};
  }
`
