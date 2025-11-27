import React, {useState} from 'react';

// компонент однієї таски
const TodoItem = ({ task, handleDeleteTask, handleToggleTask, handleChangeTitleTask }) => {

    console.log("TodoItem rendered");

    /*
    isEditing -> чи редагується завдання
    newTitle -> новий title завдання
     */
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleSave = () => {
        //Якщо немає тексту задача видаляється
        if(newTitle.trim().length === 0){
            handleDeleteTask(task.id);
            return;
        }
        //зміна заголовку завдання
        handleChangeTitleTask(task.id, newTitle);
        setIsEditing(false);
    };

    // Якщо режим редагування активний — рендеримо інпути
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
            {/* Натискання на текст вмикає режим редагування */}
            <div onClick={() => setIsEditing(true)}>{task.completed ? <del>{task.title}</del> : <span>{task.title}</span>}</div>
            <button onClick={() => handleDeleteTask(task.id)} >Delete</button>
        </div>
    );
}

export default React.memo(TodoItem);