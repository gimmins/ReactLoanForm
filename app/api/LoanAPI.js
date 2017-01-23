import React from 'react';
import axios from 'axios';
import moment from 'moment';
import uuid from 'uuid';

function submitLoan(loanAmount, propertyValue, socialSecurity) {
  return axios.post('http://localhost:8888/loan_api.php/loan', {
    loanAmount: loanAmount,
    propertyValue: propertyValue,
    socialSecurity: socialSecurity,
  })
  .then(response => {
    if (response.status === 200) {
      return response.data[0];
    } else {
      console.log(response);
    }
  });
}

function getLoan(loanId) {
  return axios.get(`http://localhost:8888/loan_api.php/loan/${loanId}`)
  .then(response => {
    if (response.status === 200) {
      return response.data[0];
    } else {
      console.log(response);
    }
  })
}

export {
  submitLoan,
  getLoan,
}
