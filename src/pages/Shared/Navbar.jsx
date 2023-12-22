import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navOptions = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
      <li>
        <Link to={"#Blogs"}>Blogs</Link>
      </li>
      <li>
        <Link to={"#About"}>About</Link>
      </li>
      {!user ? (
        <>
          <Link
            to={"/login"}
            className="block md:hidden text-lg font-medium bg-[#1a1a1a] text-white px-5 py-2 rounded my-2"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="block md:hidden text-lg font-medium bg-[#1a1a1a] text-white px-5 py-2 rounded"
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <div>
              <img className="w-12 h-12 rounded-full" src={user?.photoURL} />
            </div>
            <div>
              <h4>{user?.displayName}</h4>
            </div>
          </div>

          <button
            onClick={handleLogOut}
            className="block md:hidden text-lg font-medium bg-[#1a1a1a] text-white px-5 py-2 rounded my-2"
          >
            Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar max-w-7xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <div>
          <Link to={"/"} className="text-2xl font-bold text-teal-500">
            Taskly
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end gap-2">
        {!user ? (
          <>
            <Link
              to={"/login"}
              className="hidden md:block text-lg font-medium bg-[#1a1a1a] text-white px-5 py-2 rounded my-2"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="hidden md:block text-lg font-medium bg-[#1a1a1a] text-white px-5 py-2 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogOut}
            className="hidden md:block text-lg font-medium bg-[#1a1a1a] text-white px-5 py-2 rounded my-2"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
