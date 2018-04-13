import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as actions from '../actions'
import { connect } from 'react-redux';
import AlertForm from './AlertForm'



function CoinItem(params) {

  let iconUrl = "https://www.cryptocompare.com";
  // methods
  function setAlert() {

  }

  function getDetail() {

  }

  function getHold(lst) {
    let ifhas = false;
    let idx = _.find(lst, function(coin){ return coin.name==params.coin.name; });
    if (idx) return "Yes";
    else return "No"
  }

  function editCoin() {
    params.flipAlertModal("MODAL_OPEN"+"/"+params.coin.Symbol);
  }

  function isModalOpen(mess) {
    console.log("msss", mess);
    return mess=="MODAL_OPEN"+"/"+params.coin.Symbol;
  }

  function update() {

  }

  function getPrice(sym) {
    if (!params.prices[sym]) return ""
    let price = params.prices[sym]["USD"];
    return price;

  }
  let price = getPrice(params.coin.Symbol)
  if (!price) return <div></div>;



  return <Card>
    <CardBody>
      <Row>
          <Col><img src={ iconUrl+params.coin.ImageUrl } height="100%" width="25%"/></Col>
          <Col>{ params.coin.CoinName }</Col>
          <Col>${ price }</Col>
          <Col></Col>
          <Col><Button onClick={ getDetail }>Detail</Button></Col>
          <Col><Button onClick={ editCoin }>Setting</Button></Col>
      </Row>
    </CardBody>
    <div>
       <Modal isOpen={ isModalOpen(params.message.editCoinMessage) }>
       <ModalHeader>Setting Reminder</ModalHeader>
         <ModalBody>
           <AlertForm code={params.coin.Symbol} />
         </ModalBody>
       </Modal>
     </div>
  </Card>;

}

function state2props(state) {
  return {
    user: state.auth,
    prices: state.prices,
    message: state.message,
  };
}

export default connect(state2props, actions)(CoinItem);
