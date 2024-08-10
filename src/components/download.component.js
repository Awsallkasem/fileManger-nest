import React, { Component } from "react";
import authHeader from "../services/auth-header";
export default class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() {
    fetch(JSON.parse(localStorage.getItem('downloadUri')), { headers: authHeader() })
        .then(response => response.blob())
        .then(blob => {
            var blobURL = URL.createObjectURL(blob);
            this.setState({docFile:blobURL})
            const link = document.createElement('a');
            link.href = blobURL;
            link.setAttribute(
            'download',
            ``,
            );
            document.body.appendChild(link);
            link.click();

      link.parentNode.removeChild(link);
        })
        .catch(error => {
            console.error(error);
        });
        this.props.history.push('/fileInGroup')

}
  render() {
    return (
      <div>
      </div>
    );
    }
}
