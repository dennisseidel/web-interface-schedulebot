import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import io from 'socket.io-client';
import * as actions from '../actions/';
import Chatbox from './chatbox';

export const BACKEND_ROOT_URL = process.env.BACKEND_ROOT_URL || 'http://localhost:3000';
export const socket = io(BACKEND_ROOT_URL);

class Chat extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem('token');
    socket.on('connect', () => {
      socket.emit('authenticate', { token: jwt }) // send the jwt
      .on('unauthorized', (msg) => {
        console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
        throw new Error(msg.data.type);
      })
      .on('bot-message', (msg) => {
        console.log('Bot Message:', msg);
        this.props.recieveChat(msg);
      });
    });
  }

  handleSend({ chatInput }) {
    // check if context is defined
    let context = this.props.chat.context;
    if (typeof context === 'undefined') {
      context = {};
    }
    // Need to do something to log user in -> call action creator
    this.props.sendChat({
      role: 'user',
      text: chatInput,
      timestamp: Date.now(),
      context,
    });
  }

  handleVoice() {
    // Need to do something to log user in -> call action creator
    if (!this.props.chat.voiceinterface) {
      this.props.activateVoiceInterface();
      this.props.record();
    } else {
      this.props.deactivateVoiceInterface();
    }
  }

  renderList() {
    // add initial check that state is initialized
    if (!this.props.chat.messages) {
      return (
        <Chatbox
          usertype="bot"
          text="Getting Ready ..."
        />
      );
    }
    const chatMessages = this.props.chat.messages;
    const latestMessages = chatMessages.slice(chatMessages.length - 7, chatMessages.length);
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
    const audioButtonType = this.props.chat.voiceinterface ? 'danger' : 'primary';
    // Get handleSubmit of the props, supplied by redux-form
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        {this.renderList()}
        <form onSubmit={handleSubmit(this.handleSend.bind(this))}>
          <div className="form-group">
            <Field name="chatInput" component="input" type="text" className="form-control" />
            <button type="button" className={`btn btn-${audioButtonType}`} onClick={this.handleVoice.bind(this)}>Voice Interface</button>
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
