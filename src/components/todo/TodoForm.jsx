import React, {useState} from 'react';

const TodoForm = ({ handleAddTask }) => {

    console.log("Todo Form rendered!");
    

    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

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
            <button onClick={clickHandler} >Add Task</button>
            {error && <div className='error'>{error}</div>}
        </div>
    );
}

export default React.memo(TodoForm);
