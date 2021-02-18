import React from "react";
import "../../App.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Feed from "../Feed/Feed";
function Dashboard({ searchText, setSearchText }) {
  return (
    <div>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <div className="app_body">
        <Sidebar />
        <Feed searchText={searchText} />
      </div>
    </div>
  );
}

export default Dashboard;
