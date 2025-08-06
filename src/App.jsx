import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './App.css'



function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Learn React' },
    { id: 2, title: 'Build a Todo App' }
  ]);

 function addTodo(title) {
    const newTodo = {
      id: Date.now(),
      title,
    };

    setTodoList([...todoList, newTodo]);
    console.log("Updated list:", [...todoList, newTodo]);
  }


  return (
      <main>
        <h1>My Todos</h1>
        <TodoForm onAddTodo={addTodo} />
        
        <TodoList todoList={todoList} />
      </main> 
  );
}

export default App
