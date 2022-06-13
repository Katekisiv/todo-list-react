export interface TodoItem {
  id: number
  userId: number
  value: string
  completed: boolean
}

export interface TodoState {
  todos: TodoItem[]
  error: null | string
}

export type Filter = 'all' | 'active' | 'completed'
