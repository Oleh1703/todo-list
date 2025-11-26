import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useTodoData = () => {

    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        getTodos();
    }, [])

    const getTodos = async () => {
        const response = await axios.get("http://jsonplaceholder.typicode.com/todos?_limit=10");
        console.log("Fetch todos:", response.data);
        setTodos(response.data);
    }

    return {todos};
}

export default useTodoData;
