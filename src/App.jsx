import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './App.css'



function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Learn React' },
    { id: 2, title: 'Build a Todo App' }
  ]);

  const [newTodo, setNewTodo] = useState("My first todo");

  return (
      <main>
        <h1>My Todos</h1>
        <TodoForm/>
        <p>{newTodo}</p>
        <TodoList todos={todos} />
      </main> 
  );
}

export default App
