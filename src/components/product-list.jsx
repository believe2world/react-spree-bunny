import React, { Component } from 'react';
import ProductTile from './product-tile';
import InfiniteScroll from 'redux-infinite-scroll';

class ProductList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loadingMore: false,
      hasMore: undefined
    }
  }
  _loadMore(){
    this.setState({
      loadingMore: true
    })

    setTimeout(function () {
      this.props.loadMore(this.props.currentPage + 1);
      this.setState({
        loadingMore: false,
        hasMore: (this.props.pageCount > this.props.currentPage + 1)
      });
    }.bind(this), 100);
  }
  render() {
    let productList = this.props.productList.map((product, idx) => {
      return (
        <ProductTile key={product.id} product={product} />
      )
    });
    let infiniteScroller = null;
    if(this.props.productList.length > 0){
        infiniteScroller = <InfiniteScroll loadingMore={this.state.loadingMore}
                        loadMore={this._loadMore.bind(this)}
                        elementIsScrollable={ false }
                        hasMore={this.state.hasMore === undefined ? (this.props.pageCount > this.props.currentPage) : this.state.hasMore}>
          {productList}
        </InfiniteScroll>;
    }
    return (
      <div className="product-list row">
        {infiniteScroller}
      </div>
    );
  }
}

export default ProductList;
