import React from 'react';

import '../../style/chatbox.scss';

function createMarkup(text) {
  return { __html: text };
}

const ChatBox = props => (
  <div className={`div${props.usertype} row ${(props.usertype === 'bot') ? 'justify-content-start' : 'justify-content-end'}`} >
    <div className="col-8">
      <span className={`span${props.usertype}`} dangerouslySetInnerHTML={createMarkup(props.text)} />
    </div>
  </div>
  );

export default ChatBox;
