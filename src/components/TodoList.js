import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addTodo = () => {
    if (todo.trim() === "") return;
    setTodoList([...todoList, { text: todo, completed: false }]);
    setTodo("");
  };

  const todoCompleted = (index) => {
    const newTodos = [...todoList];
    newTodos[index].completed = !newTodos[index].completed;
    setTodoList(newTodos);
  };

  const deleteTodo = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  const completedTodos = todoList.filter((item) => item.completed);
  const activeTodos = todoList.filter((item) => !item.completed);

  return (
    <div className="todo-container">
      <div className="input-area">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder='Yapılacak görev ekle'
        />
        <button onClick={addTodo}>Ekle</button>
      </div>

      <div className="todo-lists">
        <div className="todo-section">
          <h2 className="active-title">Aktif Görevler</h2>
          <ul>
            {activeTodos.map((item, index) => (
              <li key={index} className="todo-item">
                <span>{item.text}</span>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => todoCompleted(todoList.indexOf(item))}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="todo-section">
          <h2 className="completed-title">Tamamlanan Görevler</h2>
          <ul>
            {completedTodos.map((item, index) => (
              <li key={index} className="todo-item completed">
                <span>{item.text}</span>
                <div className="actions">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => todoCompleted(todoList.indexOf(item))}
                />
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todoList.indexOf(item))}
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