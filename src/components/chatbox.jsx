import React from 'react';

import '../../style/chatbox.scss';

const ChatBox = props => (
  <div className={`div${props.usertype} row ${(props.usertype === 'bot') ? 'justify-content-start' : 'justify-content-end'}`} >
    <div className="col-8">
      <span className={`span${props.usertype}`}>
        {props.text}
      </span>
    </div>
  </div>
  );

export default ChatBox;
