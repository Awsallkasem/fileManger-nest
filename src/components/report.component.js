import React, { Component } from "react";
import Axios from "axios";
import authHeader from "../services/auth-header";
import Table from "../common/table";
import { Link } from "react-router-dom/cjs/react-router-dom";

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:3000/api/admin/getAllReports", {
      headers: authHeader(),
    }).then((res) => {
      this.setState({ reports: res.data.data });
    });
  }

  getAllReport = () => {
    Axios.get("http://localhost:3000/api/admin/getAllReports", {
      headers: authHeader(),
    }).then((res) => {
      this.setState({ reports: res.data.data });
    });
  };

  getCheckInReport = () => {
    Axios.get("http://localhost:3000/api/admin/getChekInReports", {
      headers: authHeader(),
    }).then((res) => {
      this.setState({ reports: res.data.data });
    });
  };
  getCheckOutReport = () => {
    Axios.get("http://localhost:3000/api/admin/getCheckOutReports", {
      headers: authHeader(),
    }).then((res) => {
      console.log(res.data);

      this.setState({ reports: res.data.data });
      
    });
  };

  columns = [
    { path: "id", label: "id" },
    { 
      label: "File name",
      key: "file name",
      content: (file) => {
        return (
          <a href={`http://localhost:3000${file.file.filePath}`}> {file.file.filePath}</a>
        );
      },
    },
    {
      label: "user name",
      key: "actions",
      content: (file) => {
        return (
<p>{`${file.user.Fname} ${file.user.Lname}`}</p>        );
      },
    },{ path: "action", label: "actionName" },
    { path: "createdAt", label: "date" },
     ];

  render() {
    const { reports } = this.state;
//        <th> File Name</th>
{/* <th> User Name</th> */}
{/* <th> Action Name</th> */}
{/* <th> Date </th> */}
    return (
      <div className="container">
        <h2 className="text-center">Groups List</h2>

        <Table columns={this.columns} data={reports} />
      </div>
    );
  }
}

export default Report;
