import React, { Component } from 'react';
import Spinner from './Spinner'

class FloatingActionButton extends Component {
  render() {
    var icon;
    switch (this.props.type) {
      case 'create':
        icon = (
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        )
        break;
      case 'edit':
        icon = (
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        )
        break;
      case 'save':
        icon = (
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
          </svg>
        )
        break;
      case 'loading':
        icon = (
          <Spinner onFAB={true}></Spinner>
        )
        break;
    }

    return (
      <div onClick={() => {
          this.props.onClick()
        }} className="FloatingActionButton" style={styles.container}>
        {icon}
      </div>
    )
  }
}

const styles = {
  container: {
    borderRadius: '100px',
    backgroundColor: 'rgb(93, 218, 118)',
    display: 'flex',
    padding: 17,
    position: 'fixed',
    right: '35px',
    bottom: '35px',
    cursor: 'pointer'
  }
}

export default FloatingActionButton;
