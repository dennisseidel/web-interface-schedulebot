import React from 'react';

import '../../style/chatbox.scss';

const ChatBox = props => (
  <div className={`div${props.usertype}`}>
    <span className={`span${props.usertype}`}>
      {props.text}
    </span>
  </div>
  );

export default ChatBox;
