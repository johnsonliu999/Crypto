import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'
import socket from "../socket"

import Nav from './Nav'
import Login from './Login'
import Monitor from './Monitor'
import Name from './Name'
import CoinDetail from './coin_detail/CoinDetail'

class App extends Component {
  componentDidMount() {
    let user_id = document.querySelector('meta[name="user_id"]').content;
    if (user_id) {
      this.props.fetchUser(user_id);
      let channel = socket.channel("/", {})
      channel.join()
           .receive("ok", resp => {
             console.log("Success Connect")
             this.props.getCoinList(resp)
           })
           .receive("error", resp => { console.log("Fail to join", resp) });
      channel.on("coin", resp => this.props.getCoinList(resp))
    }
	}


  render() {
    if (!this.props.auth) {
      return <Login />
    }

    let email = this.props.auth.email
    let provider = this.props.auth.provider

    return (
      <Router>
        <div>
          <Link to="/coins/BTC">BTC</Link>
          <Nav user={this.props.auth}/>
          <Name user={this.props.auth} />
          <Route path="/monitor" exact={true} component={Monitor}/>
          <Route path="/coins/:sym" exact={true} component={CoinDetail}/>
        </div>
      </Router>
    )
  }
}

function state2props(state) {
  return {
    auth: state.auth
  };
}

export default connect(state2props, actions)(App);
