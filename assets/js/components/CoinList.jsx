import React from 'react';
import { Redirect } from 'react-router-dom';
import CoinItem from './CoinItem';
import _ from 'underscore';
import { Button, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';

import * as actions from '../actions';
import { connect } from 'react-redux';


function CoinList(params) {

  if (params.coins == null) return <div>Load...</div>;

  // convert store.coins map to coinList
  let keys = Object.keys(params.coins);
  let values = Object.values(params.coins);

  let lst = _.zip(keys, values);

  lst = _.sortBy(lst, function(cc){
    //console.log("cc", cc[1]["SortOrder"]);
    return parseInt(cc[1]["SortOrder"]);
  });
  // variables
  let coinList = _.map(_.map(lst, (cc) => cc[1]), (tt) => {
    return <CoinItem key={tt.CoinName} coin={tt} />
  });

  // methods

  // render
  return<div>
    <Card style={{backgroundColor: '#DDDDDD',}}>
      <CardBody>
      <Row className="text-center align-items-center">
          <Col sm="2"><strong>Icon</strong></Col>
          <Col sm="2"><strong>Coin</strong></Col>
          <Col sm="2"><strong>Price</strong></Col>
          <Col sm="2"><strong>7d Chart(USD)</strong></Col>
          <Col sm="2"><strong>Detail</strong></Col>
          <Col sm="2"><strong>Setting</strong></Col>
      </Row>
    </CardBody>
    </Card>

    <div>
      { coinList }
    </div>

  </div>;

}

function state2props(state) {
  return {
    coins: state.coins,
    prices: state.prices,
  };
}

export default connect(state2props, actions)(CoinList);
