import React, { Component } from "react";

import './toaster.css';

const SUCCESS_MESSAGE = 'success';
const ERROR_MESSAGE = 'error'

class Toaster extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      message: '',
      type: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        opened: this.props.toaster.opened,
        message: this.props.toaster.message,
        type: this.props.toaster.type
      })
    }
    if (this.state.opened === true) {
      setTimeout(
        () => this.props.closeToaster(), 
        3000
      );
    }
  }

  render() {
    const { opened, message, type } = this.state;

    return  <div className={'toaster' + (opened === true ? ' opened ' + type : '')}>
              <p className='toaster-message'>{message}</p>
            </div>
  }
}

export default Toaster;
export { SUCCESS_MESSAGE, ERROR_MESSAGE };