import React,{Component, useEffect, useState} from 'react';
import Sale from './sale'


function Yoursales() {
  const [sales,setSales] = useState(null);

  useEffect(()=>{
      let cook = document.cookie.replaceAll('; ','=').split('=');
      var email = cook[cook.indexOf("email")+1];
      const security = cook[cook.indexOf("security")+1];
      fetch("https://api.printsplash.repl.co/getmysales",{
           method: "POST", 
            mode: "cors", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "email": email, 
              "secret_key" : security
            })
      }).then(res=>res.json()).then(resp=>{
        var produits;
        if (resp["response"] == 200){

           produits = resp["sales"].map(pro =>
              <Sale
                  id={pro[0]}
                  qte={pro[1]}
                  prix={pro[2]}
              />)

          produits.unshift(<div id="collection-title">Vos Ventes</div>) 


        }
        else
            produits = [<h1>Pas de vente</h1>]

          setSales(Array(produits));
        })
      },[])

  return (
      <>

        {sales}

      </>
  );
}

export default Yoursales;
