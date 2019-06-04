import React from 'react';
import logo from '../../assets/CB-Logo-v06.png';

class PlaceHolder extends React.Component {
  render() {
    return (
      <div className="logo">
        <img src={logo} />
        <code>Chris Black</code>
      </div>
    )
  }
}

export default PlaceHolder;