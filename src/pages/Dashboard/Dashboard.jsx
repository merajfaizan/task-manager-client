import { FaBars, FaHome, FaPlus } from "react-icons/fa";
import useGetUser from "../../hooks/useGetUser";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";

const Dashboard = () => {
  const { user } = useGetUser();
  console.log(user);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 justify-center items-center">
              <div className="">
                <h3 className="text-center bg-yellow-300 border-2 border-yellow-300 p-4">
                  Todo List
                </h3>
                <div className="border-2 border-yellow-300 min-h-screen"></div>
              </div>
              <div>
                <h3 className="text-center bg-blue-300 border-2 border-blue-300 p-4">
                  In Progress List
                </h3>
                <div className="border-2 border-blue-300 min-h-screen"></div>
              </div>
              <div>
                <h3 className="text-center bg-green-300 border-2 border-green-300 p-4">
                  Completed List
                </h3>
                <div className="border-2 border-green-300 min-h-screen"></div>
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
