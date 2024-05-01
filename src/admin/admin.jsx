import React,{Component, useEffect, useState} from 'react'
import {Helmet} from "react-helmet";
import YourProducts from './allproducts'
import Stats from '../stats'
import Alldesigners from './alldesigners'
import Adminlogs from './adminlogs'
import Messages from './messages'
import Commandes from './commandes'


export default function Admin() {
  const [session,setSession] = useState('');


  document.title = "Admin";
  document.cookie = "nom=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;";
  document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;";
  document.cookie = "security=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;";

  if (session == '')
  {
    var cookies = document.cookie.replaceAll('=',';').replaceAll(' ','').split(';');
    var write = ''
    var attmpts=''
    // var scrtp = (<h1>hello</h1>);
    if (cookies.includes("attempts"))
    {
        if (cookies[cookies.indexOf("attempts")+1] == 0)
        {
          write = "readonly";
            var left = new Date(Date.parse(cookies[cookies.indexOf("end")+1])) - new Date()
          console.log((cookies[cookies.indexOf("end")+1]))
            attmpts = (left/60000 | 0 )+"minutes restant pour le déverrouillage";
            // scrtp = 
            // <Helmet>
            //   <script>
            //     setInterval(()=>{}
            //     cookies = document.cookie.replaceAll('=',';').split(';');
            //     left = new Date (Date.parse(cookies[cookies.indexOf("end")+1])) - new Date();
            //     document.getElementById("attempts").innerHTML = "reste "+(left/60000 | 0 )+" essaie <i class='fa-solid fa-key'></i>"
            //     },60000)
            //   </script>
            // </Helmet>
          // settimeout when time is end
        }
        else
        {
            attmpts = ("reste "+cookies[cookies.indexOf("attempts")+1]+" essaie ")
            // scrtp = 
            //   <Helmet>
            //     <script>
            //       document.getElementById("attempts").innerHTML = {attmpts}
            //     </script>
            //   </Helmet>
            
        }
    }
    
      return (
        <div id="admin-login">
          <div id="attempts">{attmpts}</div>
          <input type="password"></input>
          <span onClick={(e)=>{
            if (write!=="readonly")
              fetch("https://api.printsplash.repl.co/admin",
                    {
                    method: "POST", 
                          mode: "cors", 
                          headers: {
                          "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ 
                            "secret_key" : e.currentTarget.parentElement.getElementsByTagName("input")[0].value
                          })
                    }).then(res=>res.json()).then(resp=>{
                      if (resp["response"]=="200")
                      {
                          setSession(resp["response"]);
                        document.cookie = "attempts=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;";
                        document.cookie = "end=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin";

                      }
                      else 
                      {
                        var cookies = document.cookie.replaceAll('=',';').split(';');
                        var attempts = 2;
                        if (cookies.includes("attempts"))
                          attempts = cookies[cookies.indexOf("attempts")+1]-1;
                        if (attempts>=0)
                        {
                        var date = new Date();
                        date.setHours(date.getHours()+1);
                        document.cookie = `attempts=${attempts}; expires=${date.toGMTString()}; path=/admin;`;
                        document.cookie = `end=${date.toJSON()}; expires=${date.toGMTString()}; path=/admin;`;
                        document.getElementById("attempts").innerHTML = "reste "+attempts+" essaie";
                          if(attempts==0)
                          {
                            document.getElementsByTagName("input")[0].readonly = true;
                            write="readonly";
                          }
                        }
                      }
            })
          }} className="admin-login"><i onMouseEnter={unlock} onMouseLeave={lock} className="fa-solid fa-lock"></i></span>
        </div>
      )
  }
  return(
      <> 
        <aside>
          <span className="logo">
            <img id="logo" src="logo.png" /> <span>Admin</span>
          </span>
          <nav>
            <ul>
              <li>
                <span className="material-symbols-outlined">groups</span>Designers
                <div className="layer yourproduct"  >
                  <Alldesigners/>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined">storefront</span>Produits
                <div className="layer yourproduct"  >
                  <YourProducts />
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined">local_mall</span>Commandes
                <div className="layer yourproduct">
                  <Commandes/>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined">
                query_stats
                </span>Statistiques
                <div className="layer yourproduct">
                  <Stats/>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined">
                edit_calendar
                </span>Journal
                <div className="layer yourproduct logs">
                  <Adminlogs/>
                  <Messages/>
                </div>
              </li>
              <li onClick={()=>{location.reload()}} id="logout">
                <span className="material-symbols-outlined">logout</span>Log Out
              </li>
            </ul>
          </nav>
        </aside>

    </>
    );
}


function unlock(e){
  e.currentTarget.className = "fa-solid fa-unlock";
}

function lock(e){
  e.currentTarget.className = "fa-solid fa-lock";
}