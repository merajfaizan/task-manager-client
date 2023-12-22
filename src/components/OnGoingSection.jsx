/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useDrop } from "react-dnd";
import Task from "./task";
import ToastComponent from "./ToastComponent";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const OnGoingSection = ({ inProgress, setRefetch }) => {
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
    console.log(`this ${tid} is dropped in ongoing section`);
    axiosPublic
      .put(`/tasks/update-status/${email}/${tid}/${"ongoing"}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
        console.log(res);
        setRefetch(true);
      });
  };
  return (
    <div ref={drop} >
      <h3 className="text-center bg-blue-300 border-2 border-blue-300 p-4">
        On-going List
      </h3>
      <div className="border-2 border-blue-300 min-h-screen flex flex-col  gap-5 p-2">
        {inProgress?.map((task) => {
          return <Task key={task?.tid} task={task} setRefetch={setRefetch} />;
        })}
      </div>
      <ToastComponent />
    </div>
  );
};

export default OnGoingSection;
