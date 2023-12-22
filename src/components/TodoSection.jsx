/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDrop } from "react-dnd";
import Task from "./task";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import ToastComponent from "./ToastComponent";

const TodoSection = ({ todo, setRefetch }) => {
  const axiosPublic = useAxiosPublic();
  const {
    user: { email },
  } = useAuth();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.tid),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = (tid) => {
    console.log(`this ${tid} is dropped in todo section`);
    axiosPublic
      .put(`/tasks/update-status/${email}/${tid}/${"todo"}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
        console.log(res);
        setRefetch(true);
      });
  };
  return (
    <div ref={drop}>
      <h3 className="text-center bg-yellow-300 border-2 border-yellow-300 p-4">
        To-Do List
      </h3>
      <div className="border-2 border-yellow-300 min-h-screen flex flex-col gap-5 p-2">
        {todo?.map((task) => {
          return <Task key={task?.tid} task={task} setRefetch={setRefetch} />;
        })}
      </div>
      <ToastComponent />
    </div>
  );
};

export default TodoSection;
