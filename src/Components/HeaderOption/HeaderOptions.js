import React from "react";
import "./HeaderOption.css";
import { Avatar } from "@material-ui/core";
import { useSelector} from "react-redux"
import { selectUser } from "../../features/userSlice";
function HeaderOptions({ avatar, Icon, title, onClick, name }) {
  const user = useSelector(selectUser)
  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon className="headerOption_icon" />}
      {avatar && <Avatar className="headerOption_icon" src={user?.photoUrl}> { user?.displayName != null && user.displayName[0]}</Avatar>}
      <h3 className="headerOption_title">{title}</h3>
    </div>
  );
}

export default HeaderOptions;
