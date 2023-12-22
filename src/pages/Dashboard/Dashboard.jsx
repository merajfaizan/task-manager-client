import { FaBars, FaHome, FaPlus } from "react-icons/fa";
import useGetUser from "../../hooks/useGetUser";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Task from "../../components/task";

const Dashboard = () => {
  const { user } = useGetUser();
  const {
    user: { email },
  } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [reFetch, setRefetch] = useState(false);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    axiosPublic.get(`/tasks/user/${email}`).then((res) => {
      console.log(res.data);
      setTodo(res.data.filter((task) => task.status === "todo"));
      setInProgress(res.data.filter((task) => task.status === "ongoing"));
      setCompleted(res.data.filter((task) => task.status === "completed"));
      setRefetch(false);
    });
  }, [axiosPublic, email, reFetch]);

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          <div>
            <label
              htmlFor="my-drawer-2"
              className="btn drawer-button lg:hidden"
            >
              <FaBars />
            </label>
            <h1 className="text-3xl font-bold mt-4 text-center">
              Welcome to Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
              <div>
                <h3 className="text-center bg-yellow-300 border-2 border-yellow-300 p-4">
                  To-Do List
                </h3>
                <div className="border-2 border-yellow-300 min-h-screen flex flex-col gap-5 p-2">
                  {todo?.map((task) => {
                    return <Task key={task?.tid} task={task} setRefetch={setRefetch} />;
                  })}
                </div>
              </div>
              <div>
                <h3 className="text-center bg-blue-300 border-2 border-blue-300 p-4">
                  On-going List
                </h3>
                <div className="border-2 border-blue-300 min-h-screen flex flex-col  gap-5 p-2">
                  {inProgress?.map((task) => {
                    return <Task key={task?.tid} task={task} setRefetch={setRefetch} />;
                  })}
                </div>
              </div>
              <div>
                <h3 className="text-center bg-green-300 border-2 border-green-300 p-4">
                  Completed List
                </h3>
                <div className="border-2 border-green-300 min-h-screen flex flex-col gap-5 p-2">
                  {completed?.map((task) => {
                    return <Task key={task?.tid} task={task} setRefetch={setRefetch} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div className=" mb-4">
              <div className="w-24">
                <img
                  className="rounded-full"
                  alt="user-profile"
                  src={user?.avatarUrl}
                />
              </div>
              <span className="text-xl font-bold"> {user?.name}</span>
            </div>
            <li>
              <Link className="text-xl" to={"/dashboard"}>
                {" "}
                <MdOutlineDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link className="text-xl" to={"/create-task"}>
                {" "}
                <FaPlus /> Create Task
              </Link>
            </li>
            <li>
              <Link className="text-xl" to={"/"}>
                {" "}
                <FaHome /> Back to Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
