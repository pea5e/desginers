import React,{Component, useEffect, useState} from 'react';
import Designer from '../designer'


function Adminlogs() {
  const [logs,setLogs] = useState(null);

  useEffect(()=>{
    
      fetch("https://api.printsplash.repl.co/adminlogs",{
           method: "POST", 
            mode: "cors"
      }).then(res=>res.json()).then(resp=>{
        var logs;
        if (resp["response"] == 200){

             logs = resp["admins"].map(pro =>
              <Designer
                  name={pro[1]}
                  email={pro[0]}
                  qte={pro[2]}
              />)


              setLogs(Array(logs));
        }
        })
    
      },[])

  return (
      <>
      <div id="adminlogs">
        <div>Admin Authentification<span class="material-symbols-outlined">
        key
        </span></div>
        <table>
          <thead>
            <tr>
              <th>Navigateur</th>
              <th>IP Adresse</th>
              <th>Date</th>
            </tr>
           </thead>
          <tbody>
          {logs}
          </tbody>
        </table>
      </div>
      </>
  );
}

export default Adminlogs;
