import { useState, useEffect } from 'react';
import { ToDoProvider } from './context/ToDoContext';
import './App.css';
import TodoForm from './components/ToDoForm';
import TodoItem from './components/ToDoItem';

function App() {
  const [todos, setTodos] = useState([]);

  const addToDo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateToDo = (id, todo) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? { ...item, ...todo } : item)));
  };

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleToDo = (id) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (Array.isArray(todos) && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <ToDoProvider value={{ todos, addToDo, updateToDo, deleteToDo, toggleToDo }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
