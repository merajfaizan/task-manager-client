import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CreateTask from "../pages/CreateTask/CreateTask";
import EditTask from "../pages/EditTask/EditTask";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DndProvider backend={HTML5Backend}>
              <Dashboard />
            </DndProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "/create-task",
        element: (
          <PrivateRoute>
            <CreateTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-task/:tid",
        element: (
          <PrivateRoute>
            <EditTask />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
