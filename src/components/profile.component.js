import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {this.state.userReady ? (
          <div>
            <header className="card ">
              <h3>
                <strong>{currentUser.Fname}</strong> Profile
              </h3>

              <p>
                <strong>Id:</strong> {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <strong>role:</strong>

              {currentUser.isAdmin ? "admin" : "user"}
            </header>
          </div>
        ) : null}
      </div>
    );
  }
}
