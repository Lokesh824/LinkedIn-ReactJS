import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
function CustomDialog({ open, handleClose, createPost, uploadPost }) {
  const [val, setVal] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a new Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can write a caption and upload a image
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={val}
            label="Caption"
            onChange={(e) => setVal(e.target.value)}
            type="text"
            fullWidth
          />
          <div style={{ marginTop: 20 }}>
            <form>
              <input
                onChange={(e) => setSelectedFile(e.target.files)}
                type="file"
                accept="image/*"
              />
            </form>
            {/* <img height="50%" width="50%" src={imageURL} alt="No Preview" /> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              uploadPost(val, selectedFile);
              handleClose(setSelectedFile([]));
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDialog;
