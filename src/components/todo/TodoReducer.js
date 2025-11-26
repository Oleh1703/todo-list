const todoReducer = (tasks, action) => {
    switch(action.type){
        case 'addTask':
            return [...tasks,{id: new Date().getTime(), title: action.payload.title, completed:false}];
        case 'deleteTask':
            return tasks.filter((task) => task.id !== action.payload.id);
        case 'toggleTask':
            return tasks.map((task) => (task.id === action.payload.id ? {...task, completed: !task.completed} : task));
        case 'changeTitleTask':
            return tasks.map((task) => (task.id === action.payload.id ? {...task, title:action.payload.title} : task));
        case 'setTasks':
            return action.payload;
        default:
            return tasks;
    }
}

export default todoReducer;