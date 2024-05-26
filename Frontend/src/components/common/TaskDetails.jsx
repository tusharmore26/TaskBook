import { VscEdit } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTasksContext } from "../../hook/useTaskContext";
import { useAuthContext } from "../../hook/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Dialog from "./Dialog";
import { useState } from "react";
import { toast } from "react-toastify";

function TaskDetails({ task }) {
  const { dispatch } = useTasksContext();

  const { user } = useAuthContext();
  const [openDialog, setOpenDialog] = useState(false);
  const onDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "https://taskbook-e1xb.onrender.com/api/tasks/" + task._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
      toast.success("Task Deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div
      className="flex flex-col gap-4 mt-4 p-4 bg-richblack-25 border border-richblack-50 shadow-xl"
      key={task._id}
    >
      <div className=" flex justify-between">
        <div>
          <p className="font-bold text-2xl text-blue-200">{task.title}</p>
          <p className="mt-2">{task.description}</p>
          <p className=" text-xs">(
            {formatDistanceToNow(new Date(task.createdAt), {
              addSuffix: true,
            })}
          )
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <VscEdit
            className=" hover:cursor-pointer transition-all"
            onClick={() => {
              setOpenDialog(!openDialog);
            }}
          />
          <RiDeleteBin6Line
            className=" hover:cursor-pointer transition-all"
            onClick={onDelete}
          />
        </div>
      </div>
      <Dialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title="Update Task"
        task={task}
      />
    </div>
  );
}

export default TaskDetails;
