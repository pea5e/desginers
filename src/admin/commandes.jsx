import React,{Component, useEffect, useState} from 'react';
import Commande from './commande'


function Commandes() {
  const [sales,setSales] = useState(null);

  useEffect(()=>{
      
      fetch("https://api.printsplash.repl.co/getcommandes",{
           method: "POST", 
            mode: "cors", 
            headers: {
            "Content-Type": "application/json",
            }
      }).then(res=>res.json()).then(resp=>{
        var produits;
        if (resp["response"] == 200){

           produits = resp["commandes"].map(pro =>
              <Commande
                  id={pro[0]}
                  ville={pro[1]}
                  date={pro[2]}
                  nom={pro[3]}
              />)

          produits.unshift(<div id="collection-title">Vos Commandes</div>) 


        }
        else
            produits = [<h1>Pas de Commande</h1>]

          setSales(Array(produits));
        })
      },[])

  return (
      <>
        <div id="commande-produits">
        </div>
      <div id="commandes">
        {sales}
      </div>
      </>
  );
}

export default Commandes;
