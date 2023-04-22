import { createBrowserRouter } from "react-router-dom"
import HomeView from "./views/HomeView"
import LoginView from "./views/LoginView"
import RegView from "./views/RegView"
import TodoView from "./views/TodoView"
import SimpleLayout from "./layouts/SimpleLayout"
import LogoutView from "./views/LogoutView"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SimpleLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/login",
        element: <LoginView />,
      },
      {
        path: "/reg",
        element: <RegView />,
      },
      {
        path: "/todo",
        element: <TodoView />,
      },
      {
        path: "/logout",
        element: <LogoutView />,
      },
    ],
  },
])

export default router
