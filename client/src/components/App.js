import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
//connect allows components to call action creators
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2> Dashboard </h2>
const SurveyNew = () => <h2> SurveyNew </h2>

class App extends Component {
  //lifecycle method that runs every time component renders
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
      {/* BrowserRouter expects only 1 child */}
        <BrowserRouter>
          <div>
            <Header />
            {/*exact property makes sure you don't show landing everywhere*/}
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
