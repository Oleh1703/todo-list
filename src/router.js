import { createBrowserRouter } from "react-router";
import TodoList from "./components/todo/TodoList";
import App from './App';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <TodoList/>
            }
        ]
    }
]);

export default router;