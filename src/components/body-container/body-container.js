import React, { Component } from "react";

import PaginatorBar from "./paginator-bar/paginator-bar";
import ProductsGrid from "./products-grid/products-grid";
import { ERROR_MESSAGE } from "../toaster/toaster";
import './body-container.css';

const HIGHEST_PRICE = 'Highest price';
const LOWEST_PRICE = 'Lowest Price';

class BodyContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loaded : false,
      page : 0,
      pageSize : 16,
      paginatedProducts : [],
      products : [],
      sort : HIGHEST_PRICE,
      totalPages: 0,
      totalProducts : 0,
      userPoints: 0
    }
    this.filter = this.filter.bind(this);
    this.getPage = this.getPage.bind(this);
    this.updatePoints = this.updatePoints.bind(this);
  }

  componentDidMount() {
    this.requestProducts(this.state.page, this.state.sort, this.state.pageSize);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        userPoints: this.props.points
      })
    }
  }

  requestProducts(page, sort, pageSize) {
    fetch('https://coding-challenge-api.aerolab.co/products', {
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
            products : result,
            totalProducts : result.length
          })
          this.repaginate(page, sort, pageSize);
        }
      }
    )
    .catch((error) => {
      this.props.callToaster('An error ocurred while loading the catalog, please retry',  ERROR_MESSAGE);
      console.error(error);
    });
  }

  repaginate(page, sort, pageSize) {
    this.setState({
      loaded: false
    });

    let paginatedProducts = this.state.products;
    switch (sort) {
      case LOWEST_PRICE:
        paginatedProducts = paginatedProducts.sort((a, b) => {
          return a.cost - b.cost;
        });
        break;
      default:
        paginatedProducts = paginatedProducts.sort((a, b) => {
          return b.cost - a.cost;
        });
        break;
    }

    paginatedProducts = paginatedProducts.slice(page * pageSize, (page + 1) * (pageSize));

    this.setState({
      loaded: true,
      paginatedProducts : paginatedProducts,
      totalPages: Math.round(this.state.products.length / pageSize)
    });
  }

  filter(sort) {
    if (this.state.sort !== sort) {
      this.setState({
        sort: sort
      });
      this.repaginate(this.state.page, sort, this.state.pageSize);
    }
  }

  getPage(page) {
    if (this.state.page !== page) {
      this.setState({
        page: page
      });
      this.repaginate(page, this.state.sort, this.state.pageSize);
    }
  }

  updatePoints(points) {
    if (this.state.userPoints !== points) {
      this.setState({
        userPoints: points
      })
    } 
  }

  render() {
    const { loaded, page, pageSize, paginatedProducts, sort, totalPages, totalProducts, userPoints } = this.state;
    return  <div className='main-container'>
              <PaginatorBar loaded={loaded} totalProducts={totalProducts} totalPages={totalPages} page={page} 
                pageSize={pageSize} sort={sort} withFilters={true} filter={this.filter} getPage={this.getPage}></PaginatorBar>
              <ProductsGrid paginatedProducts={paginatedProducts} points={userPoints}
                refreshUserPoints={this.props.refreshUserPoints} callToaster={this.props.callToaster}></ProductsGrid>
              <PaginatorBar loaded={loaded} totalProducts={totalProducts} totalPages={totalPages} page={page} 
                pageSize={pageSize} sort={sort} withFilters={false} filter={this.filter} getPage={this.getPage}></PaginatorBar>
            </div>
  }

}

export default BodyContainer;
export { HIGHEST_PRICE, LOWEST_PRICE };