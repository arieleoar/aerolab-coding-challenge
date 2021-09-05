import React, { Component } from "react";

import coinLogo from '../../../../assets/images/icons/coin.svg';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../toaster/toaster";

import './product-card.css';

class ProductCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      points: props.points,
      redeemOpened: false
    }
    this.toggleRedeemPanel = this.toggleRedeemPanel.bind(this);
    this.redeemProduct = this.redeemProduct.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        product: this.props.product,
        points: this.props.points
      });
    }
  }

  isRedeemable() {
    return this.state.cost < this.state.points;
  }

  calculateDifference() {
    return this.state.cost - this.state.points;
  }

  toggleRedeemPanel() {
    let redeemOpened = !this.state.redeemOpened;
    this.setState({
      redeemOpened : redeemOpened
    })
  }

  redeemProduct() {
    let bodyData = { productId : this.state.product._id }
    console.log(bodyData);
    fetch('https://coding-challenge-api.aerolab.co/redeem', {
      method: 'post',
      body: JSON.stringify(bodyData),
      headers : new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json'
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
          this.props.refreshUserPoints();
          this.toggleRedeemPanel();
          this.props.callToaster('Product redeemed successfully!', SUCCESS_MESSAGE);
        }
      }
    )
    .catch((error) => {
      this.props.callToaster('An error ocurred when redeeming this product', ERROR_MESSAGE);
      console.error(error);
    });
  }

  render() {
    const { product, redeemOpened } = this.state;

    return  <div className={'card' + (redeemOpened ? ' redeem-opened' : '')}>
              <img className='product-image' src={product.img.url} alt={product.name}></img>
              <p className='product-category'>{product.category}</p>
              <p className='product-name'>{product.name}</p>
              <div className='redeem-dialog'>
                <h4 className='product-cost'>
                  {product.cost}
                <img className='coin-logo' src={coinLogo} alt='coin'></img>
                </h4>
                <button className='redeem-button' onClick={this.redeemProduct}>
                  Redeem now
                </button>
              </div>
              <div className="redeem-toggle-container">
                <button className={'redeem-toggle' + (this.isRedeemable ? '' : ' hidden')}
                  onClick={this.toggleRedeemPanel}></button>
                <div className={'coins-container' + (this.isRedeemable ? ' hidden' : '') }>
                  <p className='coins-number'>
                    {this.isRedeemable ? '' : 'You need ' + this.calculateDifference}
                  </p>
                  <img className='coin-logo' src={coinLogo} alt='coin'></img>
                </div>
              </div>
            </div>
  }

}

export default ProductCard;