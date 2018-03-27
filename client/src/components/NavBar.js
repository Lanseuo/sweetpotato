import React, { Component } from 'react';
import Radium from 'radium';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import styleUtils from './../styleUtils';
import { Link } from 'react-router-dom'

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInputVisible: false,
    }
  }

  componentDidMount() {
    window.onkeydown = (e) => {
      // Catch [Ctrl] + [F] and activate search bar
      if(e.ctrlKey && e.keyCode == 'F'.charCodeAt(0)){
        e.preventDefault();
        this.searchInput.focus();
        this.setState({
          searchInputVisible: true
        })
      } else if (e.key == 'Escape') {
        // Catch [ESC] and close search bar
        this.props.setSearch('');
        this.setState({
          searchInputVisible: false
        })
      }
    }
  }

  onSearchSVGClick() {
    if (this.state.searchInputVisible) {
      this.searchInput.blur();
      // Go to Home
      if (this.props.location.pathname != '/') {
        this.props.history.push('/')
      }
    } else {
      this.searchInput.focus();
      this.setState({
        searchInputVisible: true
      })
    }
  }

  onBlurInput() {
    if (!this.props.search) {
      this.setState({
        searchInputVisible: false
      })
    }
  }

  onChangeInput(e) {
    this.props.setSearch(e.target.value)
  }

  onEnterInput(e) {
    console.log(e.key);
    if (e.key == 'Enter') {
      // Go to Home
      this.searchInput.blur();
      if (this.props.location.pathname != '/') {
        this.props.history.push('/')
      }
    }
  }

  render() {
    return (
      <nav className="NavBar" style={styles.container}>
        <Link to="/"><h1
          style={this.state.searchInputVisible ? { ...styles.heading, ...styles.headingSearchInputVisible }
                                               : { ...styles.heading }}
          type="text"
          >sweetPotatoe</h1></Link>
          <svg style={styles.searchSVG} onClick={this.onSearchSVGClick.bind(this)} fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          <input
            onKeyPress={this.onEnterInput.bind(this)}
            onBlur={this.onBlurInput.bind(this)}
            onChange={this.onChangeInput.bind(this)}
            value={this.props.search}
            ref={(input) => { this.searchInput = input; }}
            style={this.state.searchInputVisible ? { ...styles.searchInput, ...styles.searchInputVisible }
                                                 : { ...styles.searchInput }} type="search"/>
      </nav>
    )
  }
}

const styles = {
  container: {
    backgroundColor: 'rgb(93, 218, 118)',
    padding: '20px 15px',
    position: 'relative'
  },

  heading: {
    color: 'white',
    margin: 0,
    [styleUtils.mediaQueries.mobile]: {
      textAlign: 'center',
    },
  },

  // Hide heading if searchbar is visible
  headingSearchInputVisible: {
    [styleUtils.mediaQueries.mobile]: {
      visibility: 'hidden'
    }
  },

  searchSVG: {
    position: 'absolute',
    right: 20,
    top: '50%',
    bottom: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    zIndex: 500
  },

  searchInput: {
    position: 'absolute',
    right: '20px',
    top: '50%',
    bottom: '50%',
    transform: 'translate(0, -50%)',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    fontSize: 20,
    color: 'white',

    // Almost full width on mobile devices
    [styleUtils.mediaQueries.mobile]: {
      width: 'calc(100% - 40px)'
    },

    // Will be overwritten when it is open
    width: 0,
    padding: 0,
    border: 0,

    transition: 'width 0.2s ease-in-out'
  },

  searchInputVisible: {
    border: '2px solid white',
    padding: '7px 40px 7px 7px',
    width: '350px',

    // Only on Chrome (https://www.codeproject.com/Tips/1167666/How-to-Apply-CSS-HACKS-for-Different-Browsers-Chro)
    '@media screen and (-webkit-min-device-pixel-ratio:0)': {
      padding: '17px 40px 17px 7px'
    }
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.reducer.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearch: (search) => {
      dispatch({
        type: 'SET_SEARCH',
        payload: search
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(NavBar)));
