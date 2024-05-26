import { useState, useEffect } from "react";
import formComponentStyle from "../../styles/Form.module.css";
import { useAuthContext } from "../../hook/useAuthContext";
import { useTasksContext } from "../../hook/useTaskContext";
import { toast } from "react-toastify";

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  position: "absolute",
  top: "-10px",
  left: "8px",
  background: "#fdfdfd",
  padding: "0px 4px",
  color: "#707070",
};

const UpdateDialog = ({ openDialog, setOpenDialog, task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const { user } = useAuthContext();
  const { dispatch } = useTasksContext();

  const hanldeUpdate = async () => {
    const response = await fetch(
      "https://taskbook-e1xb.onrender.com/api/tasks/" + task._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, description, isCompleted: false }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      toast.success("Task Details Updated!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setOpenDialog(false);
    }
    if (!response.ok) {
      console.log(json.error);
    }
  };

  return (
    <div
      className={formComponentStyle.form}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          className={formComponentStyle.field}
          style={{ marginTop: "5px", position: "relative" }}
        >
          <label style={labelStyle}>Task Name</label>
          <input
            type="text"
            placeholder="Name *"
            style={{ width: "230px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div
          className={formComponentStyle.field}
          style={{ marginTop: "18px", position: "relative" }}
        >
          <label style={labelStyle}>Description</label>
          <textarea
            type="text"
            placeholder="Bio *"
            style={{ width: "230px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button style={{ marginTop: "10px" }} onClick={hanldeUpdate}>
          Update Task Details
        </button>
      </div>
    </div>
  );
};

export default UpdateDialog;
