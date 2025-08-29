import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading, errorMessage }) {
  return (
    <>
       {isLoading ? (
        <p>Todo list loading...</p>
      ) : errorMessage ? (
        <div>
          <hr />
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      ) : todoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
