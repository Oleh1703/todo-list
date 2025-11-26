import React, { useCallback, useEffect, useReducer, useState } from 'react';
import './Todo.css';
import useTodoData from './useTodoData';
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoReducer from './TodoReducer';

const filtersObject = {
    All: () => true,
    Todo: (task) => !task.completed,
    Done: (task) => task.completed,
};

const TodoList = () => {

    const { todos } = useTodoData();
    // const [tasks, dispatch] = useReducer(TodoReducer, []);
    const [tasks, dispatch] = useReducer(TodoReducer, [], () => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [filter, setFilter] = useState(() => {
        return localStorage.getItem('filter') || 'All';
    });

    // Ініціалізація tasks після отримання todos
    useEffect(() => {
    const saved = localStorage.getItem('tasks');
    const savedTasks = saved ? JSON.parse(saved) : [];

    if (savedTasks.length === 0 && todos.length > 0) {
        // Завантажуємо дані з API лише якщо локально пусто
        dispatch({ type: 'setTasks', payload: todos });
    }
}, [todos]);

    // Збереження tasks у localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Збереження filter у localStorage
    useEffect(() => {
        localStorage.setItem('filter', filter);
    }, [filter]);

    const handleAddTask = useCallback((title) => {
        dispatch({ type: 'addTask', payload: { title } });
    }, []);

    const handleDeleteTask = useCallback((id) => {
        dispatch({ type: 'deleteTask', payload: { id } });
    }, []);

    const handleToggleTask = useCallback((id) => {
        dispatch({ type: 'toggleTask', payload: { id } });
    }, []);

    const handleChangeTitleTask = useCallback((id, title) => {
        dispatch({ type: 'changeTitleTask', payload: { id, title } });
    }, []);

    return (
        <div className="todo">
            <TodoForm handleAddTask={handleAddTask} />
            <TodoFilter
                filter={filter}
                setFilter={setFilter}
                filtersObject={filtersObject}
            />
            <div>
                {tasks.filter(filtersObject[filter]).map((task) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        handleDeleteTask={handleDeleteTask}
                        handleToggleTask={handleToggleTask}
                        handleChangeTitleTask={handleChangeTitleTask}
                    />
                ))}
            </div>
        </div>
    );

};

export default TodoList;
