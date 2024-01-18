import { useEffect, useState } from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoItem from "./Component/TodoItem";
import TodoForm from "./Component/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [colorChange, setColorChange] = useState('#9fbcd2');

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <TodoProvider
      value={{ addTodo, updateTodo, deleteTodo, toggleComplete, todos }}
    >
      <div className="container-fluid mt-5" >
        <div className="row d-flex justify-content-center align-items-center  ">
          <div className="col-md-6 py-3" style={{ backgroundColor:colorChange }}>
          <input type="color" onChange={(e)=>setColorChange(e.target.value)} className="form-control form-control-color" id="exampleColorInput" value={colorChange} title="Choose your color" />

            <h3 className="text-center">Manage Your Todos</h3>
            <div className="my-2 p-2">
              <TodoForm />
            </div>
            <div className="d-flex flex-column gap-2 mt-3">
              {todos.map((todo) => (
                <div key={todo.id} className="w-100">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
