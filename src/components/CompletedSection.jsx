/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDrop } from "react-dnd";
import Task from "./task";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import ToastComponent from "./ToastComponent";

const CompletedSection = ({ completed, setRefetch }) => {
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
    console.log(`this ${tid} is dropped in completed section`);
    axiosPublic
      .put(`/tasks/update-status/${email}/${tid}/${"completed"}`)
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
      <h3 className="text-center bg-green-300 border-2 border-green-300 p-4">
        Completed List
      </h3>
      <div className="border-2 border-green-300 min-h-screen flex flex-col gap-5 p-2">
        {completed?.map((task) => {
          return <Task key={task?.tid} task={task} setRefetch={setRefetch} />;
        })}
      </div>
      <ToastComponent />
    </div>
  );
};

export default CompletedSection;
