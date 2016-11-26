import React, { Component } from "react";
import { connect } from "react-redux";
import { selectBook } from "../actions/index.js";
import { bindActionCreators } from "redux";

class BookList extends Component {
  renderList() {
    return this.props.books.map(
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

  render() {
    return(
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

// Make the action dispatcher available in props - anything returned from this
// function will be on the props of this container
// e.g. the key selectBook will make the imported action selectBook available
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called the action should be dispatched to all of
  // the applications reducers
  return bindActionCreators({ selectBook: selectBook}, dispatch);
}

function mapStateToProps(state) {
  return {
    books: state.books // maps this.props.books = state.books (populated by combinedReducer)
  };
}
// Promote BookList from a component to a container - it needs to know about the
// new dispatch method. Make it available on props
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
