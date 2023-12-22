/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import { useDrag } from "react-dnd";

const Task = ({ task, setRefetch }) => {
  const {
    user: { email },
  } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleDelete = async (taskId) => {
    try {
      const response = await axiosPublic.delete(`/tasks/${email}/${taskId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setRefetch(true);
      } else {
        toast.error(response.data.message);
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="bg-blue-50 p-2 rounded-sm cursor-grab">
      <ToastContainer />
      <h1 className="font-medium font-lg">{task?.title}</h1>
      <p>{task?.description}</p>
      <br />
      <p>
        <strong>Priority:</strong> {task?.priority}
      </p>
      <p>
        <strong>Deadline:</strong> {task?.deadline}
      </p>
      <div className="flex mt-2 ">
        <Link to={`/edit-task/${task.tid}`}>
          <button className="btn bg-black text-white font-medium">Edit</button>
        </Link>
        <button
          onClick={() => handleDelete(task.tid)}
          className="btn bg-red-500 text-white font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
