import React, { Component } from "react";

import ProductCard from "./product-card/product-card";
import './products-grid.css';

class ProductsGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded : false,
      paginatedProducts : [],
      points: 0
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loaded: true,
        paginatedProducts: this.props.paginatedProducts,
        points: this.props.points
      })
    }
  }

  render() {
    const { loaded, paginatedProducts, points } = this.state;
    if (loaded) {
      return  <div className='products-grid'>
                {paginatedProducts.map((product, index) => {
                  return (
                    <ProductCard key={index} product={product} points={points} callToaster={this.props.callToaster}
                      refreshUserPoints={this.props.refreshUserPoints}></ProductCard>
                  );
                })}
              </div>
    }
    else {
      return <p>Loading...</p>
    }
  }

}

export default ProductsGrid;