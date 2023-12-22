/* eslint-disable no-unused-vars */
import { set, useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import swal from "sweetalert";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToastComponent from "../../components/ToastComponent";

const EditTask = () => {
  const {
    user: { email },
  } = useAuth();
  const { tid } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  console.log(task);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axiosPublic.get(`/tasks/user/${email}/${tid}`);
        const { success, task } = response.data;
        setTask(task);

        if (success) {
          // Set default values for form fields
          setValue("title", task.title);
          setValue("description", task.description);
          setValue("priority", task.priority);
          setValue("deadline", task.deadline);
        } else {
          toast.error("Task not found");
        }
      } catch (error) {
        toast.error("Error fetching task data:", error);
      }
    };

    fetchTaskData();
  }, [tid, axiosPublic, email, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    const modifiedTask = {
      ...task,
      title: data.title,
      description: data.description,
      priority: data.priority,
      deadline: data.deadline,
    };
    try {
      const response = await axiosPublic.put(
        `/tasks/user/${email}/${tid}`,
        modifiedTask
      );
      if (response.data.success) {
        swal("Success", "Task updated successfully", "success");
        // Redirect to the task list page or any other page
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="flex justify-center bg-slate-100">
      <ToastComponent />
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
          Edit Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
