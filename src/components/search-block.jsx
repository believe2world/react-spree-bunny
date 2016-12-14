import React, { Component } from 'react';
import SearchModal  from './search-modal';

class searchBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({showModal: true});
  };

  close() {
    this.setState({showModal: false});
  };

  render() {
    return (
      <dd className="icon-block withbg">
        <a className="link-icon-elem" onClick={this.open}></a>
        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        <SearchModal showModal={this.state.showModal} close={this.close}/>
      </dd>
    );
  }
}

export default searchBlock;
