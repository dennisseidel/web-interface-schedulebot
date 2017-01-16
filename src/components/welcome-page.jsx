import React from 'react';

import ChatBox from './chatbox';

export default () => (
  <div className="jumbotron">
    <ChatBox usertype="bot" text="I'm your scheduling assistant, tell me what you need and I schedule a call with the most qualified agent for you!" />
    <ChatBox usertype="user" text="This is how you can ask for my help." />
    <ChatBox usertype="bot" text="I can help you, but please sign in first. The button is right at the top. Thank you!" />
  </div>
    );


// <div className="container">
    //    <h3 className="display-6">Welcome to the amazing bookstore with React/Redux</h3>
    // </div>
