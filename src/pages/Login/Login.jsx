/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import ToastComponent from "../../components/ToastComponent";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { handleLogin, googleSignUp } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // google signup
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    googleSignUp(googleProvider)
      .then((result) => {
        const detailedUser = result.user;

        // add user to database (if user email is not exists in DB)
        axiosPublic
          .post("/users", {
            name: detailedUser.displayName,
            email: detailedUser.email,
            avatarUrl: detailedUser.photoURL,
            tasks: [],
          })
          .then((response) => {
            if (!response.data.success) {
              return swal("Good job!", "Successfully Logged In", "success");
            }
          })
          .catch((error) => {
            console.error(error);
          });

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message.split(":");
        toast.error(errorMessage[1]);
      });
  };

  // onsubmit call firebase and login user
  const onSubmit = (data) => {
    const { email, password } = data;
    handleLogin(email, password)
      .then((result) => {
        swal("Good job!", "Successfully Logged In", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message.split(":");
        toast.error(errorMessage[1]);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Welcome Back to Taskly! Log in to your account to continue making a
            difference in the life. Your commitment to hard work and discipline
            will grow you big in life , and we appreciate your dedication.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control w-full input input-bordered"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="error">Email is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control w-full input input-bordered"
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <span className="error">
                  Password is required and must be at least 6 characters long
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                className="bg-[#1a1a1a] text-white py-2 w-full rounded-lg cursor-pointer"
                type="submit"
                value="Login"
              />
            </div>
            <label className="label">
              <Link to={"/register"} className="label-text-alt link link-hover">
                Don&apos;t have an account? <strong>Register here</strong>
              </Link>
            </label>
            {/* Google Login Button */}
            <div className="form-control mt-4">
                <button
                  type="button"
                  className="btn"
                  onClick={handleGoogleSignIn}
                  style={{
                    background:
                      "linear-gradient(to right, #4285F4, #34A853, #FBBC05, #EA4335)",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                >
                  <FaGoogle className="mr-2" />
                  Sign in with Google
                </button>
              </div>
          </form>
        </div>
      </div>
      <ToastComponent />
    </div>
  );
};

export default Login;
