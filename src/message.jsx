import React ,{Component, useEffect, useState} from 'react';



function Message(props) {
    
    return (
      <div className="message">
        <h2 className="message-info">{props.email} en {props.date}</h2>
        <textarea readonly className="message-text">{props.message}</textarea>
      </div>
  )
}

export default Message;