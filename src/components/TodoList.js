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

    const deleteTodo = (index) => {
        setTodoList(todoList.filter(( _ , i ) => i !== index))
    }

    const completedTodos = todoList.filter((item) => item.completed)
    const activeTodos = todoList.filter((item) => !item.completed)

   return (
    <div>
        <input 
           value = {todo}
           onChange={(e) => setTodo(e.target.value)}
           placeholder='Yapılacak görevi ekle'
        /> 

        <button onClick={addTodo}>Ekle</button>

        <h2>Aktif Görevler</h2>
        <ul>
            {activeTodos.map((item,index) => (
                <li key={index}>
                    <span>
                     {item.text}
                    </span>
                    <input 
                    type = "checkbox"
                    checked = {item.completed}
                    onChange={() => todoCompleted(todoList.indexOf(item))}
                    style={{ marginLeft: "10px" }}
                    />
                </li>
            ))}
        </ul>

        <h2>Tamamlanan Görevler</h2>
        <ul>
            {completedTodos.map((item,index) => (
                <li key={index} style={{ textDecoration: "line-through" }}>
                    <span>
                     {item.text}
                    </span>
                    <input 
                    type = "checkbox"
                    checked = {item.completed}
                    onChange={() => todoCompleted(todoList.indexOf(item))}
                    style={{ marginLeft: "10px" }}
                    />

                    <button onClick={() => deleteTodo(todoList.indexOf(item))}
                       style={{ marginLeft: "10px" }}
                    >Sil</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default TodoList