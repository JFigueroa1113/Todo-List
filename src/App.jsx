import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Learn React', isCompleted: false },
    { id: 2, title: 'Build a Todo App', isCompleted: false }
  ]);

  function addTodo(title) {
    const newTodo = {
      id: Date.now(),
      title,
      isCompleted: false
    };

    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  return (
    <main>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </main>
  );
}

export default App;
