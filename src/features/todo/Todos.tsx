import React, { ReactEventHandler, useState } from 'react';

import { useGetTodoQuery, useGetTodosQuery, Todo } from './todoAPI';
import styles from './Todo.module.css';
import { TodoComponent } from './Todo';

export function Todos() {

  const [todoId, setTodoId] = React.useState<Todo['id'] | null>(null);
  
  const { data: todos, isLoading: isLoadingTodos } = useGetTodosQuery();

  const completeHandler = (e: any, id: number) => {
    console.log('ID=> ', id, e);
  }

  if(isLoadingTodos) return (<div>Loading...</div>);

  return (
    <div>
      {todoId && <TodoComponent todoId={todoId}/>}
      <div className={styles.wrapper}>
        {todos && todos.map((todo) => (
          <div
            key={todo.id}
            onClick={() => setTodoId(todo.id)}
            className={styles.card}
          >
            {todo.title}
            <hr/>
            <input onChange={(e) => completeHandler(e, todo.id)} type="checkbox" checked={todo.completed} />
          </div>
        ))}
      </div>
    </div>
  );
}
