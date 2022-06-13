import { useTypedSelectors } from '../../hooks/useTypedSelectors'
import { StyledPagination, StyledPaginationButton } from './Pagination.style'

const Pagination = ({
  itemsPerPage,
  paginate,
  currentPage,
}: {
  itemsPerPage: number
  paginate: Function
  currentPage: number
}) => {
  const pageButtons = []
  const { todos } = useTypedSelectors((state) => state.todos)

  for (let i = 1; i < 6; i++) {
    if (currentPage === 1 && i <= Math.ceil(todos.length / itemsPerPage)) {
      pageButtons.push(i)
    } else if (
      currentPage !== 1 &&
      i <= Math.ceil(todos.length / itemsPerPage)
    ) {
      pageButtons.push(currentPage - 2 + i)
    }
  }

  const paginateToPage = (event: any): void => {
    paginate(Number(event.target.textContent))
  }
  return (
    <StyledPagination>
      {pageButtons.map((pageButton) => (
        <StyledPaginationButton
          key={pageButton}
          onClick={paginateToPage}
          selected={pageButton === currentPage}
        >
          {pageButton}
        </StyledPaginationButton>
      ))}
    </StyledPagination>
  )
}

export default Pagination
