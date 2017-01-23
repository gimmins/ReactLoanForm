var React = require('react');
var ReactDOM = require('react-dom');
var { Route, Router, IndexRoute, browserHistory } = require('react-router');

var Main = require('Main');
var LoanSubmission = require('LoanSubmission');
var LoanStatusFinder = require('LoanStatusFinder');
var LoanStatus = require('LoanStatus');

// Load foundation
require('script!foundation-sites');
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="form" component={LoanSubmission}/>
      <Route path="status" component={LoanStatusFinder}/>
      <Route path="status/:loanId" component={LoanStatus}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
