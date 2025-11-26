import React, {useState} from 'react';

const TodoItem = ({ task, handleDeleteTask, handleToggleTask, handleChangeTitleTask }) => {

    console.log("TodoItem rendered");

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleSave = () => {
        if(newTitle.trim().length === 0){
            handleDeleteTask(task.id);
            return;
        }
        handleChangeTitleTask(task.id, newTitle);
        setIsEditing(false);
    };

    if(isEditing){
        return (
            <div className='task'>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <button onClick={handleSave}>Save</button>
            </div>
        )
    }

    return (
        <div className='task'>
            <input type='checkbox' defaultChecked={task.completed} onClick={() => handleToggleTask(task.id)}/>
            <div onClick={() => setIsEditing(true)}>{task.completed ? <del>{task.title}</del> : <span>{task.title}</span>}</div>
            <button onClick={() => handleDeleteTask(task.id)} >Delete</button>
        </div>
    );
}

export default React.memo(TodoItem);