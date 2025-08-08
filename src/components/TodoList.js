import React, { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = () => {
    if (todo.trim() === "") return;
    const newTodo = { id: Date.now(), text: todo, completed: false };
    setTodoList((prev) => [...prev, newTodo]);
    setTodo("");
  };

  const todoCompleted = (id) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  };

  const completedTodos = todoList.filter((item) => item.completed);
  const activeTodos = todoList.filter((item) => !item.completed);

  return (
    <div className="todo-container">
      <div className="input-area">
        <input
          id="todoInput"
          name="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Yapılacak görev ekle"
        />
        <button onClick={addTodo}>Ekle</button>
      </div>

      <div className="todo-lists">
        <div className="todo-section">
          <h2 className="active-title">Aktif Görevler</h2>
          <ul>
            {activeTodos.map((item) => (
              <li key={item.id} className="todo-item">
                <span>{item.text}</span>
                <div className="actions">
                  <input
                    type="checkbox"
                    id={`todo-${item.id}`}
                    name={`todo-${item.id}`}
                    checked={item.completed}
                    onChange={() => todoCompleted(item.id)}
                    style={{ order: 1, marginLeft: "10px" }}
                  />
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(item.id)}
                    style={{ order: 2, marginLeft: "10px" }}
                  >
                    Sil
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="todo-section">
          <h2 className="completed-title">Tamamlanan Görevler</h2>
          <ul>
            {completedTodos.map((item) => (
              <li key={item.id} className="todo-item completed">
                <span>{item.text}</span>
                <div className="actions">
                  <input
                    type="checkbox"
                    id={`todo-${item.id}`}
                    name={`todo-${item.id}`}
                    checked={item.completed}
                    onChange={() => todoCompleted(item.id)}
                    style={{ order: 1, marginLeft: "10px" }}
                  />
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(item.id)}
                    style={{ order: 2, marginLeft: "10px" }}
                  >
                    Sil
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;