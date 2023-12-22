import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import swal from "sweetalert";

const CreateTask = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const task = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      deadline: data.deadline,
      status: "todo",
    };
    axiosPublic
      .post(`/tasks/create/${user.email}`, task)
      .then((res) => {
        if(res.data.modifiedCount > 0){
          swal("Good job!", "Task created successfully", "success");
          navigate("/dashboard");
        } else {
          swal("Oops!", "Something went wrong, try again", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-96 rounded-lg mx-auto flex flex-col gap-4 p-4 m-4 bg-white"
      >
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            name="title"
            type="text"
            id="title"
            placeholder="title of the task"
            className="input input-bordered w-full max-w-xs"
            {...register("title", { required: true })}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text"> Description</span>
          </div>
          <textarea
            name="description"
            type="text"
            id="description"
            placeholder="Type here details"
            className="textarea textarea-bordered"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </label>

        <select
          name="priority"
          className="select select-bordered w-full max-w-xs"
          id="priority"
          {...register("priority", { required: "Priority is required" })}
        >
          <option value="" disabled selected>
            Select Priority
          </option>
          <option value="High">High</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
        </select>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Deadline</span>
          </div>
          <input
            name="deadline"
            type="date"
            id="deadline"
            className="input input-bordered w-full max-w-xs"
            {...register("deadline", { required: "Deadline is required" })}
          />
        </label>

        <button className="btn bg-teal-500 text-white" type="submit">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
