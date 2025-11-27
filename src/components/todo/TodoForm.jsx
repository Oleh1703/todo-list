import React, {useState} from 'react';

const TodoForm = ({ handleAddTask }) => {
    //handleAddTask -> ф-ція з батьківськог окомпонента для дод.Завдань

    console.log("Todo Form rendered!");
    
    /* 
    title -> стан для заголовку ('' - початкове значеня) 
    error- стан для помилок (false - помилки немає)
    */
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);


    //Сторення нової задані з використанням (handleAddTast)
    const clickHandler = () => {
        if(title.length === 0){
            setError("Title cannot be empty");
            return;
        }
        if(title.length < 3){
            setError("Title must be at least 3 characters");
            return;
        }
        handleAddTask(title);
        setTitle('');
        setError(false);
    };

    return (
        <div className='todo-form'>
            <input 
            type="text" 
            placeholder='Add Task' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            onKeyDown={(e)=> e.key === "Enter" && clickHandler() } />
            {/* Add Task */}
            <button onClick={clickHandler} >Add Task</button>
            {/* View error if he != false  */}
            {error && <div className='error'>{error}</div>}
        </div>
    );
}

export default React.memo(TodoForm);
