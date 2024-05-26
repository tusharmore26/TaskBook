import React, { useState } from "react";
import { useTasksContext } from "../../hook/useTaskContext";
import { useAuthContext } from "../../hook/useAuthContext";
import { toast } from "react-toastify";

function TaskForm() {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [err, setErr] = useState(null);
  const [emptyField, setEmptyField] = useState([]);
  const addTask = async (e) => {
    e.preventDefault();
    if (!user) {
      setErr("you must be logged in");
      return;
    }

    const task = { title, description, isCompleted };

    const response = await fetch(
      "https://taskbook-e1xb.onrender.com/api/tasks",
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setErr(json.err);
      setEmptyField(json.emptyFields);
    } else if (response.ok) {
      toast.success("New Task Added!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTitle("");
      setDescription("");
      setIsCompleted(false);
      setErr(null);
      setEmptyField([]);
      console.log("new Workout add ", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <div>
      <div className=" border border-black rounded-xl w-[300px] p-4 mr-20 max-h-fit shadow-2xl">
        <form className="flex flex-col gap-6 mr-2 p-4" onSubmit={addTask}>
          <p className="font-bold text-2xl text-pink-800">Add Task</p>

          <div className="flex flex-col gap-4 p-2 ">
            <label className="flex flex-col gap-2">
              Task Name :
              <input
                type="text"
                placeholder="Enter the task"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="border  h-[35px] p-2 rounded-md border-black"
              />
            </label>
            <label className="flex flex-col gap-2">
              Description :
              <textarea
                className="border p-2 rounded-md border-black "
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </label>
          </div>

          <div>
            <button
              type="submit"
              className=" border border-black w-full rounded-md p-1 font-semibold bg-yellow-50"
            >
              Add Task
            </button>
            {err && <div className="error">{err}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
