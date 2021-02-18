import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import InputOption from "../InputOption/Inputoption";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import CustomDialog from "../../../Dialog/index";
import ConfirmationBox from "../../../ConfirmationBox/index";
// import Modal from "@material-ui/core/Modal";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function Post({
  name,
  description,
  message,
  photoURL,
  createdBy,
  currentUid,
  updatePost,
  postId,
  currentpostId,
  setPostId,
  deletePost,
  photoCaption,
  photoUpload,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [confopen, setConfOpen] = React.useState(false);

  const handleConfClickOpen = () => {
    setConfOpen(true);
  };

  const handleConfClose = () => {
    setConfOpen(false);
  };
  const handleDelete = () => {
    setConfOpen(true);
  };
  return (
    <div className="post">
      <div className="post_header">
        {confopen && (
          <ConfirmationBox
            handleClickOpen={handleConfClickOpen}
            handleClose={handleConfClose}
            open={confopen}
            handleDelete={deletePost}
            currentPostId={currentpostId}
          />
        )}

        <Avatar src={photoURL}>
          {name != null && name.length > 0 ? name[0] : ""}
        </Avatar>
        <div className="post_info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <div className="editOptions">
          {createdBy === currentUid ? (
            <>
              <EditIcon onClick={() => handleOpen()} />{" "}
              <DeleteIcon onClick={() => handleDelete()} />{" "}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="post_body">
        {photoCaption != "" || photoUpload != "" ? (
          <>
            <p>{photoCaption}</p>
            <img className="post_bodyImg" src={photoUpload} alt="No Preview" />
          </>
        ) : (
          <p>{message}</p>
        )}
      </div>
      <div>
        <CustomDialog
          open={open}
          handleClose={handleClose}
          value={message}
          updateFeed={updatePost}
          currentpostId={currentpostId}
          photoCaption={photoCaption}
          photoUpload={photoUpload}
          title="Edit Post"
          heading="Make changes and submit your post"
          caption="Heading / Caption"
          imageURL="https://source.unsplash.com/random"
        />
      </div>
      <div className="post_buttons">
        <InputOption Icon={ThumbUpOutlinedIcon} title="Like" color="gray" />
        <InputOption
          Icon={ChatBubbleOutlineOutlinedIcon}
          title="Comment"
          color="gray"
        />
        <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
      </div>
    </div>
  );
}

export default Post;
