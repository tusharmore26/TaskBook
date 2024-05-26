import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "../../styles/Profile.module.css";
import UpdateDialog from "./UpdateDialog";

const Dialog = ({ openDialog, setOpenDialog, title, task }) => {
  return (
    <div
      className={
        openDialog ? `${styles.dialog} ${styles.opened}` : styles.dialog
      }
    >
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <AiFillCloseCircle
            size={20}
            color={"#333333"}
            onClick={() => setOpenDialog(!openDialog)}
          />
          <h4>{title}</h4>
        </div>

        <div className={styles.contentWrapper}>
          <UpdateDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            task={task}
          />
        </div>
      </div>

      <div
        className={styles.dialogMask}
        onClick={() => setOpenDialog(!openDialog)}
      ></div>
    </div>
  );
};

export default Dialog;
