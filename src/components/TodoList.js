import React, { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = () => {
    if (todo.trim() === "") return;
    const newTodo = { id: Date.now(), text: todo, completed: false };
    setTodoList((prev) => [...prev, newTodo]);
    setTodo("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
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

  const clearCompleted = () => {
    setTodoList((prev) => prev.filter((item) => !item.completed));
  };

  const startEditing = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const saveEdit = (id) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text: editText.trim() || item.text } : item
      )
    );
    setEditId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
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
          onKeyDown={handleKeyDown}
          placeholder="Yapılacak görev ekle"
        />
        <button onClick={addTodo}>Ekle</button>
      </div>

      <div className="todo-lists">
        <div className="todo-section">
          <h2 className="active-title">
            Aktif Görevler <span className="counter">({activeTodos.length})</span>
          </h2>
          <ul>
            {activeTodos.map((item) => (
              <li key={item.id} className="todo-item">
                {editId === item.id ? (
                  <>
                    <input
                      type="text"
                      className="edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEdit(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(item.id);
                        else if (e.key === "Escape") cancelEdit();
                      }}
                      autoFocus
                    />
                    <div className="actions">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => todoCompleted(item.id)}
                        className="todo-checkbox"
                      />
                      <button
                        className="delete-btn"
                        onClick={() => deleteTodo(item.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span onDoubleClick={() => startEditing(item.id, item.text)}>{item.text}</span>
                    <div className="actions">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => todoCompleted(item.id)}
                        className="todo-checkbox"
                      />
                      <button
                        className="delete-btn"
                        onClick={() => deleteTodo(item.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="todo-section completed-section">
          <h2 className="completed-title">
            Tamamlanan Görevler <span className="counter">({completedTodos.length})</span>
          </h2>
          <ul className="completed-list">
            {completedTodos.map((item) => (
              <li key={item.id} className="todo-item completed">
                <span>{item.text}</span>
                <div className="actions">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => todoCompleted(item.id)}
                    className="todo-checkbox"
                  />
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(item.id)}
                  >
                    Sil
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {completedTodos.length > 0 && (
            <button className="clear-completed-btn" onClick={clearCompleted}>
              Tümünü Sil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;