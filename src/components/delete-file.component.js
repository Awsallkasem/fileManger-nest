import React, { Component } from "react";
import fileService from "../services/file.service";
import groupService from "../services/group.service";

class DeleteFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      id: [],
      selected: "",
    };
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.readFile = this.readFile.bind(this);
    this.lockFile = this.lockFile.bind(this);
    this.onChangeChecked = this.onChangeChecked.bind(this);
    this.bulckLock = this.bulckLock.bind(this);
  }

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
  unlockFile(fileId) {
    fileService.unlockFile(fileId);
    window.location.reload();
  }
  lockFile(fileId, uri, locked) {
    if (locked) {
      console.log("locked");
    } else {
      fileService.lockFile(fileId);
      localStorage.setItem("downloadUri", JSON.stringify(uri));
      window.location.href = "/Download";
    }
  }
  readFile(contentType, uri) {
    localStorage.setItem("contentType", JSON.stringify(contentType));
    localStorage.setItem("downloadUri", JSON.stringify(uri));
    window.location.href = "/FileRead";
  }

  deleteEmployee(fileId) {
    fileService.deleteFile(fileId).then((res) => {
      this.setState({
        files: this.state.files.filter((file) => file.id !== fileId),
      });
    });
  }
  componentDidMount() {
    fileService.getFiles().then((res) => {
      this.setState({ files: res.data.data });
    });
  }
  
  render() {
    return (
      <div>
        <h2 className="text-center">Files List</h2>
        <div className="row">
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
          </div>
          <br></br>

          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th></th>
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
                      onClick={() =>
                        this.readFile(
                          file.contentType,
                          `http://localhost:3000${file.filePath}`
                        )
                      }
                      className="btn btn-secondary"
                    >
                      Read File{" "}
                    </button>
                    {!file.isBlocked && (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                          this.lockFile(file.id,`http://localhost:3000${file.filePath}` , file.lock)
                        }
                        className="btn btn-warning"
                      >
                        Lock File{" "}
                      </button>
                    )}
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.unlockFile(file.id)}
                      className="btn btn-dark"
                    >
                      Unlock File{" "}
                    </button>

                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteEmployee(file.id)}
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

export default DeleteFile;
