import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export const todoApi = createApi({
  reducerPath: 'todoAPI',
  tagTypes: ['AllTodos'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getTodo: builder.query<Todo, Todo['id']>({
      query: (todoId) => ({
          url: `/todos/${todoId}`,
          method: 'GET',
        })
    }),
    getTodos: builder.query<Todo[], void>({
      query: () => ({
          url: `/todos`,
          method: 'GET',
        }),
    }),
  }),
})

  export const { useGetTodoQuery, useGetTodosQuery } = todoApi