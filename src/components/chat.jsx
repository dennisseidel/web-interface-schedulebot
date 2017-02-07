import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import io from 'socket.io-client';
import * as actions from '../actions/';
import Chatbox from './chatbox';

const BACKEND_ROOT_URL = process.env.BACKEND_ROOT_URL || 'http://localhost:3000';
export const socket = io(BACKEND_ROOT_URL);
var mediaRecorder = null;
var chunks = [];
class Chat extends Component {

  componentDidMount() {
    socket.on('bot-message', (msg) => {
      console.log('Bot Message:', msg);
      this.props.recieveChat(msg);
    });
  }

  handleStopClick() {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
    var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
    console.log(blob);
  }

  handleMicClick() {
    // record audio https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStream) => {
        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        mediaRecorder.ondataavailable = function(e) {
             chunks.push(e.data);
            } 
      }).catch((err) => {
        console.log('The following gUM error occured: ' + err); 
      });
      } else {
        console.log('getUserMedia not supported on your browser!');
      } 
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
    // Get handleSubmit of the props, supplied by redux-form
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        {this.renderList()}
        <form onSubmit={handleSubmit(this.handleSend.bind(this))}>
          <div className="form-group">
            <Field name="chatInput" component="input" type="text" className="form-control" />
            <button type="button" className="btn btn-primary" onClick={this.handleMicClick}>Record</button>
            <button type="button" className="btn btn-primary" onClick={this.handleStopClick}>Stop</button>
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
