import React,{Component, useEffect, useState} from 'react';
import Best from './best'

function Yourbest() {
    const [sales,setSales] = useState(null);

    useEffect(()=>{
        let cook = document.cookie.replaceAll('; ','=').split('=');
        var url ;
        var data;
        if(location.href.includes('admin'))
        {
          url = "https://api.printsplash.repl.co/getbests"
          data = {
            "type":"admin"
          }
        }
        else
        {
          var email = cook[cook.indexOf("email")+1];
          const security = cook[cook.indexOf("security")+1];
          url =  "https://api.printsplash.repl.co/getmybests";
          data = {
            "email": email, 
            "secret_key" : security
          }
        }
      fetch(url,{
           method: "POST", 
            mode: "cors", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(res=>res.json()).then(resp=>{
          var produits;
          if (resp["response"] == 200){

             produits = resp["bests"].map(pro =>
                <Best
                    id={pro[0]}
                    qte={pro[1]}
                    prix={pro[2]}
                />)

            produits.unshift(<h2>Best Sales</h2>) 


          }
          else
              produits = [<h1>Pas de vente</h1>]

            setSales(Array(produits));
          })
        },[])

    return (
        <div id="bests">

          {sales}

        </div>
    );
}

  export default Yourbest;