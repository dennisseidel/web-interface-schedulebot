import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/";

class BookList extends Component {
  renderList() {
    // add initial check that state is initialized
    if(!this.props.books.books) {
      return(
        <li
          key="book-title"
          className="list-group-item">
          Loading...
        </li>
      );
    }
    return this.props.books.books.map(
      (book) => { return(
        <li
          onClick={() => this.props.selectBook(book)}
          key={book.title}
          className="list-group-item">
          {book.title}
        </li>
      );
    }
  );
}

componentWillMount() {
  this.props.fetchBooks();
}
render() {
    return(
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  //console.log(state.books.books);
  return {
    books: state.books // maps this.props.books = state.books (populated by combinedReducer)
  };
}
// Promote BookList from a component to a container - it needs to know about the
// new dispatch method. Make it available on props
export default connect(mapStateToProps, actions)(BookList);
