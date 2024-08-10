import React, { Component } from "react";
import groupService from "../services/group.service";

class DeleteUsersFromGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
    this.deleteUser = this.deleteUser.bind(this);
  }
  async deleteUser(userId) {
    await groupService
      .deleteUserFromGroup(userId, JSON.parse(localStorage.getItem("group")))
      .then((res) => {
        this.setState({
          users: this.state.users.filter((user) => user.id !== userId),
        });
        window.location.reload();
      });
  }

  async componentDidMount() {
    const response = await groupService.getAllUsersInGroup(
      JSON.parse(localStorage.getItem("group"))
    );

    this.setState({
      users: response,
    });
  }
  render() {
    return (
      <div className="container">
        {" "}
        <h2 className="text-center">Users List</h2>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> User ID</th>
                <th> User Name</th>
                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((item) => (
                <tr key={item.user.id}>
                  <td> {item.user.id} </td>
                  <td> {`${item.user.Fname} ${item.user.Lname}`} </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteUser(item.user.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
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

export default DeleteUsersFromGroup;
