import React,{Component, useEffect, useState} from 'react';
import Message from '../message'


function Messages() {
  const [messages,setMessages] = useState(null);

  useEffect(()=>{
    
      fetch("https://api.printsplash.repl.co/getmessages",{
           method: "POST", 
            mode: "cors"
      }).then(res=>res.json()).then(resp=>{
        var messages;
        if (resp["response"] == 200){

             messages = resp["messages"].map(pro =>
              <Message
                  message={pro[1]}
                  email={pro[0]}
                  date={pro[2]}
              />)


              setMessages(Array(messages));
        }
        })
    
      },[])

  return (
      <>
        
          <div className="messages">
            <span className="material-symbols-outlined">
            mail
            </span>Messages
          {messages}
          </div>
      </>
  );
}

export default Messages;
