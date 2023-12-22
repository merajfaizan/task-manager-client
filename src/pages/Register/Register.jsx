/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import swal from "sweetalert";
import ToastComponent from "../../components/ToastComponent";
import { GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { googleSignUp, HandleCreateUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatarUrl: avatarUrl,
    tasks: [],
  });

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
              return swal("Good job!", "Successfully Registered", "success");
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

  // handle avatar input
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageURL = URL.createObjectURL(file);
      setAvatar(file);
      setAvatarPreview(imageURL);
    }
  };

  useEffect(() => {
    if (avatarUrl) {
      const userData = {
        ...userInfo,
        avatarUrl,
      };
      // create user entry in the database
      axiosPublic.post("/users", userData).then((res) => {
        if (res.data.insertedId) {
          swal("Good job!", "Successfully Registered", "success");
          setIsRegistered(false);
          navigate("/login");
        }
        if (res.data.insertedId == null) {
          toast.warn("user already exists, try different email.");
          setIsRegistered(false);
        }
      });
    }
  }, [avatarUrl]);

  // onsubmit call firebase and register user and add data to the server
  const onSubmit = (data) => {
    console.log(data);
    setIsRegistered(true);
    const { name, email, password } = data;
    const userData = {
      ...userInfo,
      name,
      email,
    };
    setUserInfo(userData);
    HandleCreateUser(email, password)
      .then(async (result) => {
        const loggedUser = result.user;
        // upload photo to imageBB
        if (avatar) {
          try {
            const formData = new FormData();
            formData.append("image", avatar);
            const response = await fetch(
              `https://api.imgbb.com/1/upload?key=${
                import.meta.env.VITE_IMAGEBB_CLIENT_KEY
              }`,
              {
                method: "POST",
                body: formData,
              }
            );

            if (response.ok) {
              const data = await response.json();
              setAvatarUrl(data.data.url);
              handleUpdateUserProfile(name, data.data.url);
            } else {
              console.error("Image upload failed:", response.statusText);
              setIsRegistered(false);
            }
          } catch (error) {
            console.error("Error during image upload:", error);
          }
        } else {
          console.error("No image selected for upload.");
        }
      })
      .catch((error) => {
        const errorMessage = error.message.split(":");
        toast.error(errorMessage[1]);
      });
  };

  const handleUpdateUserProfile = (name, photoUrl) => {
    const profile = {
      displayName: name,
      photoURL: photoUrl,
    };
    updateUserProfile(profile)
      .then(() => {
        console.log("profile updated");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Welcome to Taskly, where every registration is a step towards
              Success and discipline. By becoming a registered User, you join a
              community of compassionate individuals committed to making a
              difference.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control w-full input input-bordered"
                  id="name"
                  placeholder="Enter your name"
                  {...register("name", { required: true })}
                />
                {errors.name && <span className="error">Name is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control w-full input input-bordered"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="error">Email is required</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="avatar">Avatar</label>
                <input
                  type="file"
                  className="form-control w-full"
                  id="avatar"
                  required
                  onChange={handleAvatarChange}
                />
                {avatarPreview && (
                  <img className="w-20 h-20" src={avatarPreview} alt="Avatar" />
                )}
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
                <button
                  className={`bg-[#1a1a1a] inline-flex justify-center items-center gap-2 text-white py-2 w-full rounded-lg cursor-pointer`}
                  type="submit"
                >
                  Register{" "}
                  {isRegistered && (
                    <span className="loading loading-spinner loading-md"></span>
                  )}
                </button>
              </div>

              <label className="label">
                <Link to={"/login"} className="label-text-alt link link-hover">
                  Already have an account? <strong>Login here</strong>
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
    </>
  );
};

export default Register;
