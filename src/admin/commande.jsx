import React ,{Component, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';



function Commande(props) {
  /*<Link to="/admin/commande" params={{id:props.id}} target="_blank">*/
  // const node = document.createElement("div");
  // const popup = (message, {type, timeout}) => {
  //   document.body.appendChild(node);
  //   const PopupContent = (id) => {
  //     return (
  //       <Popup props={id}>
  //         {message}
  //         <button
  //           onClick={clear}
  //         >Close</button>
  //       </Popup >
  //     );
  //   };

  //   const clear = () => {
  //     ReactDOM.unmountComponentAtNode(node);
  //     node.remove();
  //   }

  //   ReactDOM.render(<PopupContent/>, node);
  // };
  
    return (
      <div onClick={()=>details(props.id)}>
      <div className="commande">
        <h2 className="commande-info">{props.ville} le {props.date}</h2>
        <h2 className="commande-info">{props.nom}</h2>
      </div>
      </div>
  )
}

function details(cid)
{
  fetch("https://api.printsplash.repl.co/getcommitems",{
          method: "POST", 
           mode: "cors", 
           headers: {
           "Content-Type": "application/json",
           },
           body: JSON.stringify({
             "cid":cid
           })
       }).then(res=>res.json()).then(resp=>{
       
       if (resp["response"] == 200){
            var popup = document.getElementById("commande-produits")
          popup.style.display = "block";
         html = "";
          resp["sales"].forEach((pro) =>{
            blob = blobs[pro[0]]
             html += `<div className="sales">
                 <img className="sales-img" src=${blob} />
                 <h2 className="sales-info">quantité: ${pro[1]}<span/>prix unitaire:${pro[2]}</h2>
               </div>`
            
            
          })
         popup.innerHTML = html;
         console.log(resp["sales"])
         

       }
  })
}

export default Commande;