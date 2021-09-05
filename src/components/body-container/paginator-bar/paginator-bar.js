import React, { Component } from "react";
import { HIGHEST_PRICE, LOWEST_PRICE } from '../body-container';

import './paginator-bar.css';

class PaginatorBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded : false,
      page : props.page,
      pageSize : props.pageSize,
      sort : props.sort,
      totalPages : props.totalPages,
      totalProducts : props.totalProducts,
      withFilters : props.withFilters
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      this.setState({
        loaded : this.props.loaded,
        page : this.props.page,
        pageSize : this.props.pageSize,
        sort : this.props.sort,
        totalPages : this.props.totalPages,
        totalProducts : this.props.totalProducts,
        withFilters : this.props.withFilters
      })
    }
  }

  render() {
    const { loaded, page, pageSize, sort, totalPages, totalProducts, withFilters } = this.state;
    return  <div className='paginator-container'>
              <p className='pagination'>{loaded ? (page + 1) * pageSize + ' of ' + totalProducts + ' products' : '0 of 0 products'}</p>
              <div className={'pagination-divisor' + (withFilters ? '' : ' hidden')}>&nbsp;| Sort by</div>
              <button className={'filter-button' + (sort === HIGHEST_PRICE ? ' selected' : '') + (withFilters ? '' : ' hidden')}
                onClick={(event) => this.props.filter(HIGHEST_PRICE)}>
                {HIGHEST_PRICE}
              </button>
              <button className={'filter-button' + (sort === LOWEST_PRICE ? ' selected' : '') + (withFilters ? '' : ' hidden')}
                onClick={(event) => this.props.filter(LOWEST_PRICE)}>
                {LOWEST_PRICE}
              </button>
              <div className='paginator-buttons'>
                <button className={'arrow-button left-arrow' + (page === 0 ? ' hidden' : '')} onClick={(event) => this.props.getPage(page - 1)}></button>
                <button className={'arrow-button right-arrow' + (page === totalPages - 1 ? ' hidden' : '')} onClick={(event) => this.props.getPage(page + 1)}></button>
              </div>
            </div>
  }
}

export default PaginatorBar;