import React, { useEffect, useState } from "react";
import { useTasksContext } from "../hook/useTaskContext";
import { useAuthContext } from "../hook/useAuthContext";
import TaskDetails from "../components/common/TaskDetails";
import TaskForm from "../components/common/TaskForm";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        "https://taskbook-e1xb.onrender.com/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // const responseClone= await response
      const jason = await response.json();
      console.log(jason);

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: jason });
      }
    };

    if (user) {
      fetchTask();
    }
  }, [dispatch, user, tasks]);

  return (
    <div className=" w-10/12 mx-auto mt-10">
      <p className="text-4xl font-bold mb-8 text-caribbeangreen-500">Tasks</p>

      <div className="  ml-2 flex lg:justify-between flex-col sm: gap-14 lg:flex-row ">
        {/* leftpart */}
        <div className=" w-[300px] md:w-[500px] lg:w-[650px] ">
          {tasks &&
            tasks.map((task) => {
              return <TaskDetails key={task._id} task={task} />;
            })}
        </div>

        {/* rightPart */}
        <TaskForm />
      </div>
    </div>
  );
};

export default Home;
