import React, { useCallback, useEffect, useReducer, useState } from 'react';
import './Todo.css';
import useTodoData from '../../hooks/useTodoData';
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoReducer from '../../reducers/TodoReducer';

const filtersObject = {
    All: () => true,
    Todo: (task) => !task.completed,
    Done: (task) => task.completed,
};

const TodoList = () => {

    /*
    todos -> дані з API завантажують 1 раз і записуються в LocalStorage, 
    якщо список пустий завантажуються ще раз
    tasks -> стан завдань 
    filter -> Активний фільтр (зберігається у localStorage)
    page -> номер сторінки, за замовчуванням 1
    */
    const { todos } = useTodoData();
    const [tasks, dispatch] = useReducer(TodoReducer, [], () => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [filter, setFilter] = useState(() => localStorage.getItem('filter') || 'All');
    const [page, setPage] = useState(1);

    // Ініціалізація tasks після отримання todos, якщо localStorage порожній
    useEffect(() => {
        const saved = localStorage.getItem('tasks');
        const savedTasks = saved ? JSON.parse(saved) : [];
        //Якщо всі задачі видалені то підтягуємо ще з API
        if (savedTasks.length === 0 && todos.length > 0) {
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
        setPage(1); // скидаємо сторінку при зміні фільтра
    }, [filter]);

    // Pagination
    const PAGE_SIZE = 5; // Скільки задач на сторінку
    const filteredTasks = tasks.filter(filtersObject[filter]);// Фільтрація
    const totalPages = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE));// Загальна кількість сторінок
    const pageTasks = filteredTasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);//Завдання для поточної сторінки

    // Додати завдання
    const handleAddTask = useCallback((title) => {
        dispatch({ type: 'addTask', payload: { title } });
    }, []);

    //виалити завдання
    const handleDeleteTask = useCallback((id) => {
        dispatch({ type: 'deleteTask', payload: { id } });
    }, []);

    //зміна стану завдання (виконане/невиконане)
    const handleToggleTask = useCallback((id) => {
        dispatch({ type: 'toggleTask', payload: { id } });
    }, []);

    //зміна заголовку завдання
    const handleChangeTitleTask = useCallback((id, title) => {
        dispatch({ type: 'changeTitleTask', payload: { id, title } });
    }, []);

    return (
        <div className="todo">
            {/* Форма для додавання задач */}
            <TodoForm handleAddTask={handleAddTask} />

            {/* Панель фільтрів */}
            <TodoFilter
                filter={filter}
                setFilter={setFilter}
                filtersObject={filtersObject}
            />
            <div>
                {/* Список задач + пагінація */}
                {pageTasks.map((task) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        handleDeleteTask={handleDeleteTask}
                        handleToggleTask={handleToggleTask}
                        handleChangeTitleTask={handleChangeTitleTask}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={() => setPage(1)} disabled={page === 1}>«</button>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
                <span>{page} / {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
                <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</button>
            </div>
        </div>
    );


};

export default TodoList;
