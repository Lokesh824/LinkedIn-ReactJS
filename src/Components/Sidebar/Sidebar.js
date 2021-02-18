import React from "react";
import "./Sidebar.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Sidebar() {
  const user = useSelector(selectUser);
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <img src="https://source.unsplash.com/random" alt="" />
        <Avatar src={user && user.photoUrl} className="sidebar_avatar">
          {user && user.displayName != null && user.displayName[0]}
        </Avatar>
        <h2>{user && user.displayName}</h2>
        <h4>{user && user.email}</h4>
      </div>
      <div className="sidebar_stats">
        <div className="sidebar_stat">
          <p>Who viewed you</p>
          <p className="sidebar_statNumber">2,543</p>
        </div>
        <div className="sidebar_stat">
          <p>Views on post </p>
          <p className="sidebar_statNumber">2,543</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
