import React, { Component } from 'react';

import Tool from 'Classes/Tool';

import Data from 'Data/data.json';

import './QOfferTicket.scss';
import 'Components/Tickets/Ticket.scss';

class QOfferTicket extends Component {

  constructor(){

    super();

    this.state = {
      selectedOffer: Data.qoffer[Tool.randomIntBetween(0, Data.qoffer.length)]
    }


  }

  onComponentDidMount(){

    this.props.onLoaded();

  }

  render(){

    return(

      <div className="ticket joke-ticket">

        <iframe src={this.state.selectedOffer} />

      </div>

    );

  }  

}

export default QOfferTicket;