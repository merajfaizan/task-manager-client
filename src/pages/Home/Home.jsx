import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <section className="pb-5">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://i.ibb.co/bgDJQbH/banner.jpg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Helle there</h1>
            <p className="mb-5">
              <strong>Taskly</strong> is your daily task manager, that will grow
              you and your team productivity. and make work more fun and
              enjoyable.
            </p>
            <Link to={user ? "/dashboard" : "/login"}>
              <button className="btn border-none text-lg font-medium bg-teal-500 text-white px-5 py-2 rounded my-2">
                Let&apos;s Explore
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* who can gain benefit from taskly */}
      <h1 className="text-center text-3xl md:text-5xl font-bold my-10">
        Who can gain benefit from taskly
      </h1>
      <div id="benefit">
        <div className="flex justify-center items-center gap-5 flex-col lg:flex-row">
          <img
            src={"https://i.ibb.co/gv2zGbH/benifit.jpg"}
            className="rounded-lg shadow-2xl w-full lg:w-1/2 h-[500] object-cover object-top"
            alt="benefit "
          />
          <ul className="flex-1 list-outside list-disc pl-10">
            <li>
              <strong className="text-2xl font-bold">Web Developers</strong>
              <p className="text-lg">
                Web Developer can get more productive by using taskly.
              </p>
            </li>
            <li>
              <strong className="text-2xl font-bold">Designers</strong>
              <p className="text-lg">
                Designers can get more productive by using taskly.
              </p>
            </li>
            <li>
              <strong className="text-2xl font-bold">Banker</strong>
              <p className="text-lg">
                Banker can get more productive by using taskly.
              </p>
            </li>
            <li>
              <strong className="text-2xl font-bold">Teachers</strong>
              <p className="text-lg">
                Teachers can get more productive by using taskly.
              </p>
            </li>
            <li>
              <strong className="text-2xl font-bold">Students</strong>
              <p className="text-lg">
                Students can get more productive by using taskly.
              </p>
            </li>
            <li>
              <strong className="text-2xl font-bold">Managers</strong>
              <p className="text-lg">
                Managers can get more productive by using taskly.
              </p>
            </li>
            <li>
              <strong className="text-2xl font-bold">Entrepreneurs</strong>
              <p className="text-lg">
                Entrepreneurs can get more productive by using taskly.
              </p>
            </li>
            <li>
              <strong className="text-2xl font-bold">Freelancers</strong>
              <p className="text-lg">
                Freelancers can get more productive by using taskly.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
