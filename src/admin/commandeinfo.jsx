import React,{Component, useEffect, useState} from 'react';
// import Commande from './commande'
import ReactDOM from 'react-dom';	
import { useParams } from 'react-router-dom';



function Commandesinfo(params) {
    const node = document.createElement("div");
    node.id = "commande-produits";
    const popup = (message, {type, timeout}) => {
      document.body.appendChild(node);
      const PopupContent = () => {
        

      const clear = () => {
        ReactDOM.unmountComponentAtNode(node);
        node.remove();
      }

      ReactDOM.render(<PopupContent/>, node);
    };
      return (
          <Popup type={type} open={true} timeout={timeout}>
            {message}
            <button
              onClick={clear}
            >Close</button>
          </Popup >
        );
      };
  
  }
  
}
  // const [sales,setSales] = useState(null);

  // useEffect(()=>{
      
  //     fetch("https://api.printsplash.repl.co/getcommandes",{
  //          method: "POST", 
  //           mode: "cors", 
  //           headers: {
  //           "Content-Type": "application/json",
  //           }
  //     }).then(res=>res.json()).then(resp=>{
  //       var produits;
  //       if (resp["response"] == 200){

  //          produits = resp["commandes"].map(pro =>
  //             <Commande
  //                 id={pro[0]}
  //                 ville={pro[1]}
  //                 date={pro[2]}
  //                 nom={pro[3]}
  //             />)

  //         produits.unshift(<div id="collection-title">Vos Commandes</div>) 


  //       }
  //       else
  //           produits = [<h1>Pas de Commande</h1>]

  //         setSales(Array(produits));
  //       })
  //     },[])
  

export default Commandesinfo;
