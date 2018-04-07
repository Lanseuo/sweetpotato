import React, { Component } from 'react';
import { connect } from 'react-redux';

class Error extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    if (this.props.error) {
      setTimeout(() => this.props.showError(null), 3000)
      return (
        <div className="Error" style={styles.container}>
          <p style={styles.text}>{this.props.error}</p>
        </div>
      )
    } else {
      return null
    }
  }
}

const styles = {
  container: {
    backgroundColor: 'rgb(240, 48, 36)',
    position: 'fixed',
    bottom: 25,
    left: 25,
    padding: '20px 40px',
    borderRadius: 1,
    boxShadow: '5px 5px 20px #888888'
  },

  text: {
    margin: 0,
    color: 'white'
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.reducer.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showError: (error) => {
      dispatch({
        type: 'SHOW_ERROR',
        payload: error
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);
