# TODO List React App
---

## Компоненти

- [TODO List React App](#todo-list-react-app)
  - [Компоненти](#компоненти)
  - [Опис компонентів](#опис-компонентів)
    - [TodoList](#todolist)
    - [TodoForm](#todoform)
    - [TodoItem](#todoitem)
    - [TodoFilter](#todofilter)
    - [useTodoData](#usetododata)
    - [TodoReducer](#todoreducer)
  - [Встановлення та запуск](#встановлення-та-запуск)



##  Опис компонентів

### TodoList
Головний компонент, який рендерить список задач.  
Включає:
- Ініціалізацію задач з API або Local Storage
- Фільтри (`All`, `Todo`, `Done`)
- Пагінацію
- CRUD-операції через `useReducer` та `TodoReducer`

### TodoForm
Форма для додавання нових задач.  
- Має валідацію: не менше 3 символів
- Відправляє нову задачу у `TodoList` через проп `handleAddTask`

### TodoItem
Окремий елемент списку задач.  
- Відображає заголовок та стан (виконане/невиконане)
- Можливість редагування заголовку
- Можливість видалення задачі
- Перемикання стану через чекбокс

### TodoFilter
Кнопки-фільтри для відображення всіх задач, виконаних або невиконаних.  
- Приймає `filter`, `setFilter` та `filtersObject`
- Підсвічує активний фільтр

### useTodoData
Кастомний хук для отримання задач з API (`JSONPlaceholder`)  
- Використовує `axios` для fetch-запиту
- Повертає `todos` як стан

### TodoReducer
Ред’юсер для керування станом задач через `useReducer`.  
Підтримує дії:
- `addTask`
- `deleteTask`
- `toggleTask`
- `changeTitleTask`
- `setTasks`

##  Встановлення та запуск

1. Клонуйте репозиторій:

git clone https://github.com/Oleh1703/todo-list.git

2. Встановіть залежності:

npm install

3. Запустіть застосунок:

npm start