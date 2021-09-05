import React, { Component } from "react";

import BodyContainer from './body-container/body-container';
import Header from './header/header';
import Toaster from "./toaster/toaster";

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      makeUserRefresh: false,
      toaster: {
        opened: false,
        message: '',
        type: ''
      },
      points: 0
    }
    this.callToaster = this.callToaster.bind(this);
    this.closeToaster = this.closeToaster.bind(this);
    this.refreshUserPoints = this.refreshUserPoints.bind(this);
    this.updatePoints = this.updatePoints.bind(this);
  }

  updatePoints(points) {
    if (this.state.points !== points) {
      this.setState({
        makeUserRefresh: false,
        points: points
      });
    }
  }

  refreshUserPoints() {
    this.setState({
      makeUserRefresh: true
    });
  }

  callToaster(message, type) {
    this.setState({
      toaster: {
        opened: true,
        message: message,
        type: type
      }
    })
  }

  closeToaster() {
    this.setState({
      toaster: {
        opened: false,
        message: '',
        type: ''
      }
    })
  }

  render() {
    const { makeUserRefresh, points, toaster } = this.state;
    return  <div className='main'>
              <Header updatePoints={this.updatePoints} makeUserRefresh={makeUserRefresh}
                callToaster={this.callToaster}/>
              <BodyContainer points={points} refreshUserPoints={this.refreshUserPoints} 
                callToaster={this.callToaster}/>
              <Toaster closeToaster={this.closeToaster} toaster={toaster}></Toaster>
            </div>
  }

}

export default Main;