import { useState } from 'react';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
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
    const updatedTodos = todoList.map((todo) => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoList(updatedTodos);
  }
  
  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>My Todo App</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
