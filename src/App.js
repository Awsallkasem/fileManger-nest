import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import FileUpload from "./components/file-upload.component";
import DeleteFile from "./components/delete-file.component";
import Groups from "./components/groups.component";
import FileInGroup from "./components/files_in-group.component";
import AddFileToGroup from "./components/add-file-to-group.component";
import AddUserToGroup from "./components/add-user-to-group.component";
import DeleteUsersFromGroup from "./components/delete-user-from-group.component";
import AddGroup from "./components/add-group.component";
import FileDownload from "./components/file-download.component";
import Download from "./components/download.component";
import ShareFile from "./components/shared-files.component";
import Report from "./components/report.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import FileUpdate from "./components/file-update.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: true,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.isAdmin,
         showAdminBoard:user.isAdmin,
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, } = this.state;

    return (
      <div >
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            File Manager
          </Link>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Profile
                </Link>
              </li>
             {currentUser.isAdmin&&
              <li className="nav-item">
                <a href="/delete" className="nav-link" >
                  File
                </a>
              </li>}
              {currentUser.isAdmin&&
                <li className="nav-item">
                <a href="/reports" className="nav-link" >
                  reports
                </a>
              </li>} 
              <li className="nav-item">
                <a href="/showGroups" className="nav-link" >
                  Groups
                </a>
              </li>
          
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/upload" component={FileUpload} />
            <Route path="/update" component={FileUpdate} />
            <Route path="/delete" component={DeleteFile} />
            <Route path="/showGroups" component={Groups} />
            <Route path="/fileInGroup" component={FileInGroup} />
            <Route path="/AddFileToGroup" component={AddFileToGroup} />
            <Route path="/AddUserToGroup" component={AddUserToGroup} />
            <Route path="/DeleteUsersFromGroup" component={DeleteUsersFromGroup} />
            <Route path="/AddGroup" component={AddGroup} />
            <Route path="/FileRead" component={FileDownload} />
            <Route path="/Download" component={Download} />
            <Route path="/ShareFile" component={ShareFile} /> 
            <Route path="/reports" component={Report} /> 
            <Route exact path="/" component={Profile} />
            <Route exact path="/Profile" component={Profile} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;
