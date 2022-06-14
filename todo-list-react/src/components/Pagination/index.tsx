import { useTypedSelectors } from '../../hooks/useTypedSelectors'
import { StyledPagination, StyledPaginationButton } from './Pagination.style'
import { todosPerPage } from '../../constants/todoTypes'
import { useMemo } from 'react'

const Pagination = ({
  paginate,
  currentPage,
}: {
  paginate: Function
  currentPage: number
}) => {
  const { todos } = useTypedSelectors((state) => state.todos)
  const { todosLength } = todos
  const totalPages = Math.ceil(todosLength / todosPerPage)

  const pageButtons = useMemo(() => {
    const pages = []
    for (let i = 1; i < 6; i++) {
      if (i <= totalPages) {
        if (currentPage === 1 || currentPage === 2) {
          pages.push(i)
        } else if (
          currentPage === totalPages ||
          currentPage === totalPages - 1
        ) {
          pages.push(totalPages + 1 - i)
        } else {
          pages.push(currentPage - 3 + i)
        }
      }
    }
    pages.sort((a, b) => a - b)
    return [...pages]
  }, [currentPage, totalPages])

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
