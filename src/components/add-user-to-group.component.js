import React, { Component } from "react";
import groupService from "../services/group.service";
import userService from "../services/user.service";
class AddUserToGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      errorMessage: { id: "", message: "" },
    };
    this.addUser = this.addUser.bind(this);
  }
  addUser(userId) {
    console.log(userId);
    console.log(JSON.parse(localStorage.getItem("group")));
    groupService
      .addUserToGroup(userId, JSON.parse(localStorage.getItem("group")))
      .then((res) => {
        window.location.href = "/addUserToGroup";
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message.message);
          this.setState({
            errorMessage: {
              id: userId,
              message: error.response.data.message.message,
            },
          });
        }
      });
  }

  componentDidMount() {
    const groupId = JSON.parse(localStorage.getItem("group"));
    userService.getAllUsers().then((res) => {
      const ress = res.data.data.filter((item) => {
        if (item.userGroups.length !== 0) {
          if (item.userGroups.find((group) => group.groupId === groupId)) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      });
      this.setState({ users: ress });
    });
  }
  render() {
    return (
      <div className="container">
        <h2 className="text-center">Users List</h2>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> User ID</th>
                <th> User Name</th>
                <th>Note</th>
                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td> {user.id} </td>
                  <td> {`${user.Fname} ${user.Lname}`} </td>
                  <td>
                    {this.state.errorMessage.id === user.id && (
                      <nav className={"alert alert-danger"} role="alert">
                        {this.state.errorMessage.message}
                      </nav>
                    )}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.addUser(user.id)}
                      className="btn btn-info"
                    >
                      Select{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AddUserToGroup;
