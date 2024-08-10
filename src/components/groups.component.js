import React, { Component } from "react";
import groupService from "../services/group.service";
import Table from "./../common/table";

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      user: JSON.parse(localStorage.getItem("user")),
    };

    this.deleteGroup = this.deleteGroup.bind(this);
    this.viewGroup = this.viewGroup.bind(this);
    this.addFileToGroup = this.addFileToGroup.bind(this);
    this.addUserToGroup = this.addUserToGroup.bind(this);
    this.users = this.users.bind(this);
    this.addGroup = this.addGroup.bind(this);
  }
  addGroup() {
    window.location.href = "/AddGroup";
  }
  users(groupId) {
    localStorage.setItem("group", groupId);
    console.log(JSON.parse(localStorage.getItem("group")));
    window.location.href = "/DeleteUsersFromGroup";
  }
  addUserToGroup(id) {
    localStorage.setItem("group", id);
    console.log(JSON.parse(localStorage.getItem("group")));
    window.location.href = "/AddUserToGroup";
  }

  addFileToGroup(id) {
    localStorage.setItem("group", id);
    console.log(JSON.parse(localStorage.getItem("group")));
    window.location.href = "/upload";
  }
  viewGroup(id) {
    localStorage.setItem("group", id);
    console.log(JSON.parse(localStorage.getItem("group")));
    window.location.href = "/fileInGroup";
  }
  deleteGroup(id) {
    groupService
      .deleteGroup(id)
      .then((res) => {
        this.setState({
          groups: this.state.groups.filter((group) => group.id !== id),
        });
      })
      .catch((error) => {
        if (error.response) {
          return error.response;
        }
        return error;
      });
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.isAdmin) {
      groupService.getGroups().then((res) => {
        let groups = { ...this.state.groups };
        groups = res.date;

        this.setState({ groups: groups });
      });
    } else {
      groupService.getUserGroups().then((res) => {
        let groups = { ...this.state.groups };
        groups = res.date;

        this.setState({ groups: groups });
      });
    }
  }

  columns = [
    { path: "name", label: "Group Name" },
    {
      key: "actions",
      label: "actions",
      content: (group) => (
        <div>
          <button
            onClick={() => this.viewGroup(group.id)}
            className="btn btn-secondary m-1"
          >
            View
          </button>
          <button
            onClick={() => this.addFileToGroup(group.id)}
            className="btn btn-info m-1"
          >
            Add File
          </button>
          {this.state.user.isAdmin && (
            <button
              onClick={() => this.addUserToGroup(group.id)}
              className="btn btn-light m-1"
            >
              Add User
            </button>
          )}
          <button
            onClick={() => this.users(group.id)}
            className="btn btn-dark m-1"
          >
            Users
          </button>
          {this.state.user.isAdmin && (
            <button
              onClick={() => this.deleteGroup(group.id)}
              className="btn btn-danger m-1"
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];

  render() {
    const { groups } = this.state;

    return (
      <div className="container">
        <h2 className="text-center">Groups List</h2>
        {this.state.user.isAdmin && (
          <div className="row">
            <button onClick={this.addGroup} className="btn btn-primary">
              Add Group
            </button>
          </div>
        )}
        <Table columns={this.columns} data={groups} />
      </div>
    );
  }
  // render() {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   return (
  //     <div className="container">
  //       {" "}
  //       <h2 className="text-center">Groups List</h2>
  //       {user.isAdmin && (
  //         <div className="row">
  //           <button className="btn btn-primary" onClick={this.addGroup}>
  //             {" "}
  //             Add Group
  //           </button>
  //         </div>
  //       )}
  //       <br></br>
  //       <div className="row">
  //         <table className="table table-striped table-bordered">
  //           <thead>
  //             <tr>
  //               <th> Group Name</th>
  //               <th> Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {this.state.groups.map((group) => (
  //               <tr key={group.id}>
  //                 <td> {group.name} </td>
  //                 <td>
  //                   <button
  //                     style={{ marginLeft: "10px" }}
  //                     onClick={() => this.viewGroup(group.id)}
  //                     className="btn btn-secondary"
  //                   >
  //                     View{" "}
  //                   </button>
  //                   <button
  //                     style={{ marginLeft: "10px" }}
  //                     onClick={() => this.addFileToGroup(group.id)}
  //                     className="btn btn-info"
  //                   >
  //                     Add File{" "}
  //                   </button>
  //                   {user.isAdmin && (
  //                     <button
  //                       style={{ marginLeft: "10px" }}
  //                       onClick={() => this.addUserToGroup(group.id)}
  //                       className="btn btn-light"
  //                     >
  //                       Add User{" "}
  //                     </button>
  //                   )}
  //                   <button
  //                     style={{ marginLeft: "10px" }}
  //                     onClick={() => this.users(group.id)}
  //                     className="btn btn-dark"
  //                   >
  //                     Users{" "}
  //                   </button>
  //                   {user.isAdmin && (
  //                     <button
  //                       style={{ marginLeft: "10px" }}
  //                       onClick={() => this.deleteGroup(group.id)}
  //                       className="btn btn-danger"
  //                     >
  //                       Delete{" "}
  //                     </button>
  //                   )}
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   );
  // }
}

export default Groups;
