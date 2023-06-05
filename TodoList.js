import React, { useState, useMemo } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy the project', completed: false },
  ]);

  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      id: Date.now(),
      text: event.target.value,
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    event.target.value = '';
  };

  const handleTodoCompletion = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleTodoDeletion = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input type="text" placeholder="Add a new todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => handleTodoCompletion(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleTodoDeletion(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>Completed Todos: {completedTodos.length}</p>
    </div>
  );
};

export default TodoList;

