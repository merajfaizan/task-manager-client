import { FaBars, FaHome, FaPlus } from "react-icons/fa";
import useGetUser from "../../hooks/useGetUser";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import TodoSection from "../../components/TodoSection";
import OnGoingSection from "../../components/OnGoingSection";
import CompletedSection from "../../components/CompletedSection";

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
              <TodoSection todo={todo} setRefetch={setRefetch} />
              <OnGoingSection inProgress={inProgress} setRefetch={setRefetch} />
              <CompletedSection completed={completed} setRefetch={setRefetch} />
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
