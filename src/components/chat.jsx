import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import * as actions from '../actions/';
import Chatbox from './chatbox';

const socket = io('http://localhost:3000');

class Chat extends Component {
  renderList() {
    // add initial check that state is initialized
    if (!this.props.chat.chat) {
      return (
        <Chatbox
          usertype="bot"
          text="Getting Ready ..."
        />
      );
    }
    const chatMessages = this.props.chat.chat;
    const latestMessages = chatMessages.slice(chatMessages.length - 4, chatMessages.length);
    return latestMessages.map(
      chat => (
        <Chatbox
          usertype={chat.role}
          text={chat.text}
          key={chat.text}
        />
      ));
  }

  componentWillMount() {
    // todo: fetch inital Data from the socket

    // this.props.fetchBooks();
  }
  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state.books.books);
  return {
    chat: state.chat, // maps this.props.books = state.books (populated by combinedReducer)
  };
}
// Promote BookList from a component to a container - it needs to know about the
// new dispatch method. Make it available on props
export default connect(mapStateToProps, actions)(Chat);
