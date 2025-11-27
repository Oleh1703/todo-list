import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Кастамних хук для отримання задач з API
const useTodoData = () => {

    //Список завдань
    const [todos, setTodos] = useState([]);


    //Виклик getTodos() один раз
    useEffect(()=>{
        getTodos();
    }, [])

    // Асинхронна функція для отримання даних із сервера
    const getTodos = async () => {
        const response = await axios.get("http://jsonplaceholder.typicode.com/todos?_limit=10");
        console.log("Fetch todos:", response.data);
        
        //записуємо дані у стан
        setTodos(response.data);
    }

    // Повертаємо дані, які може використовувати будь-який компонент
    return {todos};
}

export default useTodoData;
