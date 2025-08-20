import { useState } from 'react';

function TodoForm({ onAddTodo}) {
     const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
  }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input 
            type="text" 
            id="todoTitle" 
            name="title"
            value={workingTodoTitle}
            onChange={(e) => setWorkingTodoTitle(e.target.value)}
            required
            placeholder="Enter a todo"
            />
            <button type="submit" disabled={workingTodoTitle.trim() === ''}>Add Todo</button>
        </form>
    );
}

export default TodoForm;
