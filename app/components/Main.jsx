import React, { Component } from 'react';

var {Link} = require('react-router');

class Main extends Component {
  render () {
    return (
      <div>
        <div className="top-bar">
          <Link to="/form" className="top-bar-left menu forum">
            Loan Submission Form
          </Link>
          <Link to="/status" className="top-bar-left menu analytics">
            Loan Status
          </Link>
          <div className="top-bar-right menu">
            Min Soo's Github
          </div>
        </div>
        <div className="row">
          <div className="columns small-centered medium-6 large-8">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Main;
