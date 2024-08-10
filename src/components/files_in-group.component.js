import React, { Component } from "react";
import fileService from "../services/file.service";
import { Checkbox } from "./checkbox.component";
class fileInGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      errorMessage: "",
      id: [],
      selected: "",
    };
    this.deleteFileFromGroup = this.deleteFileFromGroup.bind(this);
  }
  onChangeChecked(fileId, selected) {
    if (this.state.id.length === 0) {
      this.setState({ selected: selected });
      this.state.id.push(fileId);
    } else if (this.state.id.includes(fileId)) {
      this.state.id.pop(fileId);
    } else if (this.state.selected === selected) {
      this.state.id.push(fileId);
      console.log(this.state.id);
    }
  }
  deleteFileFromGroup(fileId) {
    fileService
      .deleteFileFromGroup(fileId)
      .then((res) => {
        this.setState({
          files: this.state.files.filter((file) => file.id !== fileId),
        });
      })
      .catch((error) => {
        if (error.resposnse) {
          this.setState({
            files: this.state.files.filter((file) => file.id !== fileId),
          });
        }
      });
  }
  componentDidMount() {
    fileService
      .getAllFilesInGroup(JSON.parse(localStorage.getItem("group")))
      .then((res) => {
        this.setState({ files: res });
      });
  }
  LookFile = (fileId) => {
    fileService
      .lockFile(fileId)
      .then((res) => {
        localStorage.setItem(
          "downloadUri",
          JSON.stringify(`http://localhost:3000${res.data.data.filePath}`)
        );
        window.location.href = "/Download";
      })
      .catch((error) => {});
  };

  bulckLock = () => {
    if (this.state.id.length == 0) {
      return (
        <alert>
          {" "}
          <h1 color="red">there no item selected</h1>{" "}
        </alert>
      );
    }
    fileService.bulkLockFile(this.state.id);
    window.location.reload();
  };

  unBulckLock = () => {
    if (this.state.id.length == 0) {
      return (
        <alert>
          {" "}
          <h1 color="red">there no item selected</h1>{" "}
        </alert>
      );
    }
    fileService.unBulkLockFile(this.state.id);
    window.location.reload();
  };

  unlockFile = (fileId) => {
    fileService.unlockFile(fileId);
    window.location.reload();
  };
  showMyBlookedFiles = async () => {
    const myFiles = await fileService.showMyFiles(
      JSON.parse(localStorage.getItem("group"))
    );
    console.log(myFiles);
    this.setState({ files: myFiles });
    //  window.location.reload();
  };
  showFilesInGroup = async () => {
    fileService
      .getAllFilesInGroup(JSON.parse(localStorage.getItem("group")))
      .then((res) => {
        this.setState({ files: res });
      });
  };
  LookFile = (fileId) => {
    fileService
      .lockFile(fileId)
      .then((res) => {
        localStorage.setItem(
          "downloadUri",
          JSON.stringify(`http://localhost:3000${res.data.data.filePath}`)
        );
        window.location.href = "/Download";
      })
      .catch((error) => {});
  };

  updateileInGroup(id) {
    localStorage.setItem("file", id);
    console.log(JSON.parse(localStorage.getItem("file")));
    window.location.href = "/update";
  }

  // columns = [
  //   { path: "id", label: "id" },
  //   {
  //     label: "File name",
  //     key: "actions",
  //     content: (file) => {
  //       return (
  //         <a href={`http://localhost:3000${file.filePath}`}> {file.filePath}</a>
  //       );
  //     },
  //   },
  //   { path: "attachedByUser.Fname", label: "First Username" },
  //   { path: "attachedByUser.Lname", label: "Last Username" },
  //   {
  //     label: " is locked",
  //     key: "Locked",
  //     content: (file) => <td> {file.isBlocked ? "blooked" : "Free"}</td>,
  //   },
  //   {
  //     label: " Locked By",
  //     key: "LockeyBy",
  //     content: (file) => (
  //       <td> {file.user && `${file.user.Fname}  ${file.user.Lname}`}</td>
  //     ),
  //   },
  //   {
  //     key: "actions",
  //     label: "actions",
  //     content: (file) => (
  //       <div>
  //         <button
  //           style={{ marginLeft: "10px" }}
  //           onClick={() => this.deleteFileFromGroup(file.id)}
  //           className="btn btn-danger"
  //         >
  //           Delete{" "}
  //         </button>
  //         {!file.isBlocked && (
  //           <button
  //             style={{ marginLeft: "10px" }}
  //             onClick={() => this.LookFile(file.id)}
  //             className="btn btn-dark"
  //           >
  //             Look{" "}
  //           </button>
  //         )}
  //         {file.isBlocked && (
  //           <button
  //             style={{ marginLeft: "10px" }}
  //             onClick={() => this.unlockFile(file.id)}
  //             className="btn btn-danger"
  //           >
  //             UnLook{" "}
  //           </button>
  //         )}
  //         {file.user && file.user.id == userId && (
  //           <button
  //             style={{ marginLeft: "10px" }}
  //             onClick={() => this.updateileInGroup(file.id)}
  //             className="btn btn-dark"
  //           >
  //             update{" "}
  //           </button>
  //         )}
  //         <input
  //           type="checkbox"
  //           className="selectsingle"
  //           onChange={() =>
  //             this.onChangeChecked(file.id, file.isBlocked ? "blooked" : "free")
  //           }
  //         />
  //       </div>
  //     ),
  //   },
  // ];

  render() {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    return (
      <div>
        <h2 className="text-center">Files List</h2>
        {this.state.id.length == 0 && (
          <button
            style={{ marginLeft: "10px", marginBottom: "10px" }}
            onClick={() => this.showMyBlookedFiles()}
            className="btn btn-dark "
          >
            my Files{" "}
          </button>
        )}
        {this.state.id.length == 0 && (
          <button
            style={{ marginLeft: "10px", marginBottom: "10px" }}
            onClick={() => this.showFilesInGroup()}
            className="btn btn-primary "
          >
            Files in group{" "}
          </button>
        )}
        <br></br>
        <div className="row">
          {this.state.selected === "free" && (
            <button
              style={{ marginLeft: "10px", marginBottom: "10px" }}
              onClick={() => this.bulckLock()}
              className="btn btn-dark "
            >
              Lock{" "}
            </button>
          )}
          {this.state.selected === "blooked" && (
            <button
              style={{ marginLeft: "10px", marginBottom: "10px" }}
              onClick={() => this.unBulckLock()}
              className="btn btn-dark "
            >
              Unlook{" "}
            </button>
          )}
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> </th>
                <th> ID</th>
                <th> File Name</th>
                <th> Owner Username</th>
                <th> Locked</th>
                <th> Locked By</th>
                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              {this.state.files.map((file) => (
                <tr key={file.id}>
                  <td>
                    {
                      <input
                        type="checkbox"
                        className="selectsingle"
                        onChange={() =>
                          this.onChangeChecked(
                            file.id,
                            file.isBlocked ? "blooked" : "free"
                          )
                        }
                      />
                    }
                  </td>
                  <td> {file.id} </td>
                  <td>
                    {" "}
                    <a href={`http://localhost:3000${file.filePath}`}>
                      {" "}
                      {file.filePath}
                    </a>{" "}
                  </td>
                  <td>
                    {" "}
                    {`${file.attachedByUser.Fname}  ${file.attachedByUser.Lname}`}
                  </td>
                  <td> {file.isBlocked ? "blooked" : "Free"}</td>
                  <td>
                    {" "}
                    {file.user && `${file.user.Fname}  ${file.user.Lname}`}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteFileFromGroup(file.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                    {!file.isBlocked && (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.LookFile(file.id)}
                        className="btn btn-dark"
                      >
                        Look{" "}
                      </button>
                    )}
                    {file.isBlocked && (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.unlockFile(file.id)}
                        className="btn btn-danger"
                      >
                        UnLook{" "}
                      </button>
                    )}
                    {file.user && file.user.id == userId && (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.updateileInGroup(file.id)}
                        className="btn btn-dark"
                      >
                        update{" "}
                      </button>
                    )}
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

export default fileInGroup;
