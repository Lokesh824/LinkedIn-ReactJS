import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
function CustomDialog({
  title,
  heading,
  caption,
  imageURL,
  open,
  handleClose,
  value,
  updateFeed,
  currentpostId,
  photoCaption,
  photoUpload,
}) {
  const [val, setVal] = useState(value);
  const [photoURL, setPhotoURL] = useState(photoUpload);
  const [captions, setCaptions] = useState(photoCaption);
  const [isImage, setIsImage] = useState(
    photoCaption || photoUpload ? true : false
  );
  const [showImg, setShowImg] = useState(true);

  const handleFileChange = (file) => {
    if (file) {
      if (file[0].size <= 25000) {
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function () {
          setPhotoURL(reader.result);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      } else {
        alert("Image size can not be greater than 25KB");
      }
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{heading}</DialogContentText>
          {photoCaption != "" || photoUpload != "" ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={captions}
                label="Caption"
                onChange={(e) => setCaptions(e.target.value)}
                type="text"
                fullWidth
              />

              <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <p>Change Image from here</p>
                <input
                  style={{ marginTop: "2px", marginLeft: "5px" }}
                  onChange={(e) => handleFileChange(e.target.files)}
                  type="file"
                  accept="image/*"
                />
              </div>
              {showImg && (
                <img
                  style={{ marginTop: "30px" }}
                  src={photoURL}
                  alt="No Preview"
                />
              )}
            </>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={val}
              label={caption}
              onChange={(e) => setVal(e.target.value)}
              type="text"
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              updateFeed(currentpostId, val, captions, photoURL, isImage);
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
