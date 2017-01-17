import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import io from 'socket.io-client';
import * as actions from '../actions/';
import Chatbox from './chatbox';

export const socket = io('http://localhost:3000');

class Chat extends Component {
  componentDidMount() {
    socket.on('bot-message', (msg) => {
      console.log('Bot Message:', msg);
    });
  }

  handleSend({ chatInput }) {
    // Need to do something to log user in -> call action creator
    this.props.sendChat({
      role: 'user',
      text: chatInput,
      timestamp: Date.now(),
    });
  }

  renderList() {
    // add initial check that state is initialized
    if (!this.props.chat) {
      return (
        <Chatbox
          usertype="bot"
          text="Getting Ready ..."
        />
      );
    }
    const chatMessages = this.props.chat;
    const latestMessages = chatMessages.slice(chatMessages.length - 4, chatMessages.length);
    return latestMessages.map(
      chat => (
        <Chatbox
          usertype={chat.role}
          text={chat.text}
          key={chat.timestamp}
        />
      ));
  }

  render() {
    // Get handleSubmit of the props, supplied by redux-form
    const { handleSubmit } = this.props;
    return (
      <div>
        {this.renderList()}
        <form onSubmit={handleSubmit(this.handleSend.bind(this))}>
          <div className="form-group">
            <Field name="chatInput" component="input" type="text" className="form-control" />
          </div>
        </form>
      </div>
    );
  }
}

// Decorate the form component
Chat = reduxForm({
  // a unique name for this form
  form: 'chatForm',
})(Chat);

function mapStateToProps(state) {
  // console.log(state.books.books);
  return {
    chat: state.chat, // maps this.props.books = state.books (populated by combinedReducer)
  };
}

// Use connect from react-redux to gain access to actions
Chat = connect(mapStateToProps, actions)(Chat);

export default Chat;
