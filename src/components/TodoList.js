import React, { useState } from 'react'

function TodoList() {

    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    const addTodo = () => {
        if (todo.trim() === "") return;
        setTodoList([...todoList, { text: todo, completed: false }]);
        setTodo("");
    };

    const todoCompleted = (index) =>{
        const newTodos = [...todoList];
        newTodos[index].completed = !newTodos[index].completed;
        setTodoList(newTodos);
    }

  return (
    <div>
        <input 
           value = {todo}
           onChange={(e) => setTodo(e.target.value)}
           placeholder='Yapılacak görevi ekle'
        /> 

        <button onClick={addTodo}>Ekle</button>

        <ul>
            {todoList.map((item,index) => (
                <li key={index}>
                    <span style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                     {item.text}
                    </span>
                    <input 
                    type = "checkbox"
                    checked = {item.completed}
                    onChange={() => todoCompleted(index)}
                    style={{ marginLeft: "10px" }}
                    />
                </li>
            ))}
        </ul>

    </div>
  )
}

export default TodoList