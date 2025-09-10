import { useState, useEffect } from 'react';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import TodosViewForm from './features/TodosViewForm';
import './App.css';

const token = `Bearer ${import.meta.env.VITE_PAT}`;
const baseId = import.meta.env.VITE_BASE_ID;
const tableName = import.meta.env.VITE_TABLE_NAME;
const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

const encodeUrl = ({ sortField, sortDirection, queryString }) => {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  let searchQuery = "";

  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}", {title})`;
  }

  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const resp = await fetch(encodeUrl({ sortField, sortDirection, queryString }), {
          method: "GET",
          headers: { Authorization: token },
        });
        if (!resp.ok) throw new Error("Failed to fetch todos");

        const { records } = await resp.json();
        const fetchedTodos = records.map((record) => ({
          id: record.id,
          title: record.fields.title || "",
          isCompleted: record.fields.isCompleted || false,
        }));

        setTodoList(fetchedTodos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    setIsSaving(true);
    try {
      const resp = await fetch(encodeUrl({ sortField, sortDirection, queryString }), {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("Failed to save todo");

      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: records[0].fields.isCompleted || false,
      };

      setTodoList((prev) => [...prev, savedTodo]);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
    );

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    try {
      const resp = await fetch(encodeUrl({ sortField, sortDirection, queryString }), {
        method: "PATCH",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("Failed to update todo");
    } catch (err) {
      console.error(err);
      setErrorMessage(`${err.message}. Reverting todo...`);
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === originalTodo.id ? originalTodo : todo))
      );
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoList(updatedTodos);

    const toggledTodo = updatedTodos.find((todo) => todo.id === id);
    const payload = {
      records: [
        {
          id: toggledTodo.id,
          fields: {
            title: toggledTodo.title,
            isCompleted: toggledTodo.isCompleted,
          },
        },
      ],
    };

    try {
      const resp = await fetch(encodeUrl({ sortField, sortDirection, queryString }), {
        method: "PATCH",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("Failed to complete todo");
    } catch (err) {
      console.error(err);
      setErrorMessage(`${err.message}. Reverting todo...`);
      setTodoList(
        todoList.map((todo) =>
          todo.id === originalTodo.id ? originalTodo : todo
        )
      );
    }
  };

  return (
    <div>
      <h1>My Todo App</h1>

      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />

      <hr />

      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </div>
  );
}

export default App;
