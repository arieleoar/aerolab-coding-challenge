import React, { Component } from "react";
import aerolabLogo from "../../assets/images/aerolab-logo.svg";
import coinLogo from "../../assets/images/icons/coin.svg";
import { ERROR_MESSAGE } from "../toaster/toaster";

import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded : false,
      userName : '',
      points : 0
    }
  }

  componentDidMount() {
    this.refreshUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.makeUserRefresh === true) {
      this.refreshUser();
    }
  }

  refreshUser() {
    fetch('https://coding-challenge-api.aerolab.co/user/me', {
        headers : new Headers({
          'Authorization': 'Bearer ' + process.env.REACT_APP_API_KEY
        })
    })
    .then(result => result.json())
    .then(
      (result) => {
        if (result.success === false || result.error) {
          let error = result.message ? result.message : result.error;
          throw new Error(error);
        }
        else {
          this.setState({
            loaded : true,
            userName : result.name,
            points : result.points
          })
          this.props.updatePoints(this.state.points);
        }
      }
    )
    .catch((error) => {
      this.props.callToaster("An error ocurred while signing up the user", ERROR_MESSAGE);
      console.error(error);
    });
  }

  render() {
    const { loaded, userName, points } = this.state;
    return  <div className='header'>
              <div className='top-header'>
                <img className='aerolab-logo' src={aerolabLogo} alt="aerolab logo"></img>
                <div className='user-info'>
                  <p className='user-name'>{loaded ? userName : 'Loading...'}</p>
                  <div className={'coins-container ' + (loaded ? '' : 'disabled') }>
                    <p className='coins-number'>{loaded ? points : '--'}</p>
                    <img className='coin-logo' src={coinLogo} alt='coin'></img>
                  </div>
                </div>
              </div>
              <div className='header-banner-container'>
                <h1>Electronics</h1>
              </div>
            </div>
  };
}

export default Header;