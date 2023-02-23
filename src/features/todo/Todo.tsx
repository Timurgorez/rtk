import React, { useState } from 'react';

import { useGetTodoQuery } from './todoAPI';

export function TodoComponent({ todoId }: { todoId: number }) {
  const { data: todo, isLoading: isLoadingTodo } = useGetTodoQuery(todoId);

  return (
    <div>
      {todo && JSON.stringify(todo)}
    </div>
  );
}
