import React, { useState, useEffect } from "react";
import CreateIcon from "@material-ui/icons/Create";
import "./Feed.css";
import InputOption from "./Partials/InputOption/Inputoption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventIcon from "@material-ui/icons/Event";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Post from "./Partials/Posts/Post";
import { db } from "../../firebase";
import firebase from "firebase";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import CustomDialog from "./Partials/Dialog/index";

function Feed({ searchText }) {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [postId, setPostId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const showCommingsoon = () => {
    alert(
      "This feature will be enabled soon, for any suggestion reach dev at - https://lokesh-online.web.app/"
    );
  };
  const sendPost = (e) => {
    if (input != "") {
      e.preventDefault();
      db.collection("posts").add({
        name: user?.displayName,
        description: user?.email,
        message: input,
        userphotoUrl: user?.photoUrl || "",
        photoUpload: "",
        photoCaption: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: user?.uid,
      });
      setInput("");
    } else {
      e.preventDefault();
      alert("Can not create empty post");
    }
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const uploadPost = async (val, file) => {
    if (val != "" && file.length > 0) {
      if (file) {
        if (file[0].size <= 25000) {
          var reader = new FileReader();
          reader.readAsDataURL(file[0]);
          reader.onload = function () {
            //  return reader.result;
            db.collection("posts").add({
              name: user?.displayName,
              description: user?.email,
              message: "",
              userphotoUrl: user?.photoUrl || "",
              photoUpload: reader.result || "",
              photoCaption: val || "",
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              createdBy: user?.uid,
            });
          };
          reader.onerror = function (error) {
            console.log("Error: ", error);
          };
        } else {
          alert("Image size can not be greater than 25KB");
        }
      }
    } else {
      alert("Please enter caption and image to post");
    }
  };
  const uploadImagePost = (e) => {
    setOpenDialog(true);
  };
  const updatePost = (postid, val, captions, photoURL, isImage) => {
    if (isImage) {
      if (photoURL != "" || captions != "") {
        db.collection("posts")
          .doc(postid)
          .update({ photoUpload: photoURL, photoCaption: captions });
      } else {
        alert("Can not post empty");
      }
    } else {
      if (val != "") {
        db.collection("posts").doc(postid).update({ message: val });
      } else {
        alert("Can not post empty");
      }
    }
  };
  const deletePost = (postid) => {
    db.collection("posts").doc(postid).delete();
  };
  return (
    <div className="feed">
      <div className="feed_inputContainer">
        {openDialog && (
          <CustomDialog
            uploadPost={uploadPost}
            open={openDialog}
            handleClose={handleClose}
          />
        )}
        <div className="feed_input">
          <CreateIcon />
          <form>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Type here and press enter to submit"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed_inputOption">
          <InputOption
            Icon={ImageIcon}
            title="Photo"
            onClick={uploadImagePost}
            color="#70B5F9"
          />
          <InputOption
            Icon={SubscriptionsIcon}
            title="Video"
            onClick={showCommingsoon}
            color="#E7A33E"
          />
          <InputOption
            Icon={EventIcon}
            onClick={showCommingsoon}
            title="Event"
            color="#C0CBCD"
          />
          <InputOption
            Icon={AssignmentIcon}
            title="Write article"
            color="#7FC15E"
            onClick={showCommingsoon}
          />
        </div>
      </div>
      {posts
        .filter((val) => {
          if (searchText == "") {
            return val;
          } else if (
            val?.data?.message
              .toLowerCase()
              .includes(searchText?.toLowerCase()) ||
            val?.data?.photoCaption
              .toLowerCase()
              .includes(searchText?.toLowerCase())
          ) {
            return val;
          }
        })
        .map(
          ({
            id,
            data: {
              name,
              description,
              message,
              userphotoUrl,
              createdBy,
              photoCaption,
              photoUpload,
            },
          }) => (
            <Post
              key={id}
              currentpostId={id}
              currentUid={user.uid}
              name={name}
              description={description}
              message={message}
              photoUrl={userphotoUrl}
              createdBy={createdBy}
              updatePost={updatePost}
              postId={postId}
              setPostId={setPostId}
              deletePost={deletePost}
              photoCaption={photoCaption}
              photoUpload={photoUpload}
            />
          )
        )}

      {/* Posts */}
    </div>
  );
}
export default Feed;
