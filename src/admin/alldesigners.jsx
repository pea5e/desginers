import React,{Component, useEffect, useState} from 'react';
import Designer from '../designer'


function Alldesigners() {
  const [designers,setDesigners] = useState(null);

  useEffect(()=>{
    
      fetch("https://api.printsplash.repl.co/get_designers",{
           method: "POST", 
            mode: "cors"
      }).then(res=>res.json()).then(resp=>{
        var designers;
        if (resp["response"] == 200){

           designers = resp["designers"].map(pro =>
              <Designer
                  name={pro[1]}
                  email={pro[0]}
                  qte={pro[2]*60+',00'}
              />)


            setDesigners(Array(designers));
        }
        })
    
      },[])

  return (
      <>
        <div id="collection-title">Designers</div>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Gain</th>
            </tr>
           </thead>
          <tbody>
          {designers}
          </tbody>
        </table>
      </>
  );
}

export default Alldesigners;
