import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import {browserHistory} from 'react-router';

import * as LoanAPI from 'LoanAPI';

class LoanSubmission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'loanAmount': '',
      'isLoanAmountValid': true,
      'propertyValue': '',
      'isPropertyValueValid': true,
      'socialSecurity': '',
      'isSocialSecurityValid': true,
      'loanSubmissionResult': {},
    }

    this.onLoanAmountChange = this.onLoanAmountChange.bind(this);
    this.onPropertyValuechange = this.onPropertyValuechange.bind(this);
    this.onSocialSecurityChange = this.onSocialSecurityChange.bind(this);

    this.onLoanSubmit = this.onLoanSubmit.bind(this);
  }

  onLoanAmountChange(e) {
    const loanAmount = new Number(e.target.value);

    if (Number.isNaN(loanAmount.valueOf())) {
      this.setState({
        isLoanAmountValid: false,
      });
    } else {
      this.setState({
        isLoanAmountValid: true,
      });
    }

    this.setState({
      'loanAmount': e.target.value,
    });
  }

  onPropertyValuechange(e) {
    const propertyValue = new Number(e.target.value);

    if (Number.isNaN(propertyValue.valueOf())) {
      this.setState({
        isPropertyValueValid: false,
      });
    } else {
      this.setState({
        isPropertyValueValid: true,
      });
    }

    this.setState({
      'propertyValue': e.target.value,
    });
  }

  onSocialSecurityChange(e) {
    const socialSecurity = new Number(e.target.value);

    if (Number.isNaN(socialSecurity.valueOf())) {
      this.setState({
        isSocialSecurityValid: false,
      });
    } else {
      this.setState({
        isSocialSecurityValid: true,
      });
    }

    this.setState({
      'socialSecurity': e.target.value,
    });
  }

  onLoanSubmit(e) {
    e.preventDefault();

    if (!this.state.isLoanAmountValid ||
        !this.state.isPropertyValueValid ||
        !this.state.isSocialSecurityValid ||
        this.state.loanAmount === '' ||
        this.state.propertyValue === '' ||
        this.state.socialSecurity === '') {
      return;
    }

    LoanAPI.submitLoan(
      this.state.loanAmount,
      this.state.propertyValue,
      this.state.socialSecurity
    ).then(response => {
      if (response) {
        this.setState({
          'loanSubmissionResult' : {
            'loanId': parseInt(response['id']),
            'status': parseInt(response['status']),
          }
        })
      }
    })
  }

  renderLoanSubmissionResult() {
    console.log(this.state.loanSubmissionResult);
    if (this.state.loanSubmissionResult) {
      return (
        <div>
          <ul>
            <li>
              Loan ID: {this.state.loanSubmissionResult['loanId']}
            </li>
            <li>
              Status: {this.state.loanSubmissionResult['status'] === 1 ? 'Approved' : 'Denied'}
            </li>
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderLoanSubmissionResult()}
        <form onSubmit={this.onLoanSubmit}>
          <label>
            Loan Amount:
            <input
              type="text"
              value={this.state.loanAmount}
              onChange={this.onLoanAmountChange}
              placeholder="Please enter the loan amount"
            />
            {!this.state.isLoanAmountValid ? <span className="error">Please enter valid loan amount</span> : ''}
          </label>
          <label>
            Property Value:
            <input
              type="text"
              value={this.state.propertyValue}
              onChange={this.onPropertyValuechange}
              placeholder="Please enter the property value"
            />
          {!this.state.isPropertyValueValid ? <span className="error">Please enter valid property amount</span> : ''}
          </label>
          <label>
            Social Security Number:
            <input
              type="text"
              value={this.state.socialSecurity}
              onChange={this.onSocialSecurityChange}
              placeholder="Please enter the social security number"
            />
          {!this.state.isSocialSecurityValid ? <span className="error">Please enter valid social security number</span> : ''}
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

module.exports = LoanSubmission;
