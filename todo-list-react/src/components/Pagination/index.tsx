import { useTypedSelectors } from '../../hooks/useTypedSelectors'
import { StyledPagination, StyledPaginationButton } from './Pagination.style'
import { todosPerPage } from '../../constants/todoTypes'

const Pagination = ({
  paginate,
  currentPage,
}: {
  paginate: Function
  currentPage: number
}) => {
  const pageButtons = []
  const { todos } = useTypedSelectors((state) => state.todos)
  const { todosLength } = todos
  const totalPages = Math.ceil(todosLength / todosPerPage)

  for (let i = 1; i < 6; i++) {
    if (i <= totalPages) {
      if (currentPage === 1 || currentPage === 2) {
        pageButtons.push(i)
      } else if (currentPage === totalPages || currentPage === totalPages - 1) {
        pageButtons.push(totalPages + 1 - i)
      } else {
        pageButtons.push(currentPage - 3 + i)
      }
    }
  }

  const paginateToPage = (event: any): void => {
    paginate(Number(event.target.textContent))
  }
  return (
    <StyledPagination>
      {pageButtons
        .sort((a, b) => a - b)
        .map((pageButton) => (
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
