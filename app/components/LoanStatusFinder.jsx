import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import {Link, browserHistory} from 'react-router';

import * as LoanAPI from 'LoanAPI';

class LoanStatusFinder extends Component {

  constructor(props) {
    super(props)

    this.state = {
      'loanId': '',
    }

    this.onLoanIdChange = this.onLoanIdChange.bind(this);
    this.searchLoan = this.searchLoan.bind(this);
  }

  onLoanIdChange(e) {
    this.setState({
      'loanId': e.target.value,
    })
  }

  searchLoan(e) {
    e.preventDefault();

    browserHistory.push(`status/${this.state.loanId}`);
  }

  render() {
    return (
      <div>
        Loan Status List Page

        <form onSubmit={this.searchLoan}>
          <label>
            Please enter loan ID:
            <input
              type="text"
              value={this.state.loanId}
              onChange={this.onLoanIdChange}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

module.exports = LoanStatusFinder;
