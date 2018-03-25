import React, { Component } from 'react';

class Spinner extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    console.log(this.props.onFAB);
    return (
      <div className={this.props.onFAB == true ? 'Spinner onFAB' : 'Spinner'}>
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    )
  }
}

export default Spinner;
