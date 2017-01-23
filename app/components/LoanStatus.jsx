import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import {Link} from 'react-router';

import * as LoanAPI from 'LoanAPI';

class LoanStatus extends Component {

  constructor(props) {
    super(props)

    this.state = {
      'loanId': '',
      'loanAmount': '',
      'loanStatus': '',
      'loanApplied': '',
    }
  }

  componentWillMount() {
    LoanAPI.getLoan(this.props.params.loanId).then(response => {
      this.setState({
        'loanId': response['id'],
        'loanAmount': response['created'],
        'loanStatus': parseInt(response['status']) === 1 ? 'Approved' : 'Denied' ,
        'loanCreated': response['created'],
      })
    });
  }

  renderLoanStatus() {
    if (this.state.loanId) {
      return (
        <ul>
          <li>
            loan ID: {this.state.loanId}
          </li>
          <li>
            loan Amount: {this.state.loanAmount}
          </li>
          <li>
            loan Status: {this.state.loanStatus}
          </li>
          <li>
            loan Created: {this.state.loanCreated}
          </li>
        </ul>
      )
    }
  }

  render() {
    return (
      <div>
        Individual Loan Status Page
        {this.renderLoanStatus()}
      </div>
    )
  }
}

module.exports = LoanStatus;
