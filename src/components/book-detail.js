import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {
  render() {
    // add initial check that state is initialized
    if(!this.props.book) {
      return(
        <div>Select a book to get started.</div>
      );
    }

    return(
      <div>
        <h3>Details for:</h3>
        <div>{this.props.book.title}</div>
        <div>{this.props.book.pages} pages</div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    book: state.activeBook  // from the combinedReducers in index.js and the glue code in the app index.js
  }
}

export default connect(mapStateToProps)(BookDetail);
