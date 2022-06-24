export interface TodoItem {
  id: number
  userId: number
  value: string
  completed: boolean
}

export type Todos = { todosLength: number; completedTodosLength: number; todoItems: TodoItem[] }

export interface TodoState {
  todos: Todos
  error: null | string
}

export type Filter = 'all' | 'active' | 'completed'

export const todosPerPage = 4
