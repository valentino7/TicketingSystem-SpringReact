import React, { Component } from 'react';


import '../../assets/css/w3.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {

    return (
      <div className="animated fadeIn">
          <div className="title-container w3-container">
              <h1 className="w3-center title-text"><b>SEND YOUR TICKET</b></h1>
              <br />
              <h3 className="w3-center subtitle-text">Quickly & Easily</h3>
          </div>
      </div>
    );
  }
}

export default Dashboard;
