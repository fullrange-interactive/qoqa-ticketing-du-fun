import React, { Component } from 'react';

import JokeTicket from 'Components/Tickets/JokeTicket/JokeTicket';
import QOfferTicket from 'Components/Tickets/QOfferTicket/QOfferTicket';

import './TicketContainer.scss';

class TicketContainer extends Component {

  constructor(){

    super();

    this.state = {

      loaded: false

    }

  }

  onLoaded(){

    this.setState({
      loaded: true
    })

  }

  render(){

    return(

      <div>

        {/* PdfRendererFetcher wait until load-end is in the DOM.*/}
        {this.state.loaded && <span className="load-end"></span>}

        <QOfferTicket onLoaded={this.onLoaded.bind(this)}/>

      </div>

    );

  }

}

export default TicketContainer;
