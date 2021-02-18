import React from "react";
import "./Header.css";
import HeaderOptions from "../HeaderOption/HeaderOptions";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
function Header({ searchText, setSearchText }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutUser = () => {
    dispatch(logout());
    auth.signOut();
    history.push("/login");
  };
  const user = useSelector(selectUser);
  return (
    <div className="header">
      <div className="header_left">
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg"
          alt="LinkedIn"
        />
        <div className="header_search">
          <SearchIcon />
          <input
            placeholder="Search for post"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="header_right">
        <HeaderOptions Icon={HomeIcon} title="Home" />
        <HeaderOptions Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOptions Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOptions Icon={ChatIcon} title="Messaging" />
        <HeaderOptions
          avatar={user && user.photoUrl}
          title="Signout"
          avatar={true}
          name={user && user.displayName}
          onClick={logoutUser}
        />
      </div>
    </div>
  );
}

export default Header;
