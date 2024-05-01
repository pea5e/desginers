import React,{Component, useEffect, useState} from 'react';
import Product from './adminproduct'


function YourProducts() {
    const [products,setProducts] = useState(null);
  
    useEffect(()=>{
        let cook = document.cookie.replaceAll('; ','=').split('=');
        var email = cook[cook.indexOf("email")+1];
        const security = cook[cook.indexOf("security")+1];
        fetch("https://api.printsplash.repl.co/getshirts",{
             method: "POST", 
              mode: "cors", 
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "type": "admin"
              })
        }).then(res=>res.json()).then((resp)=>{
          var produits;
          if (resp["response"] == 200){
          
             produits = resp["tshirts"].map(pro => 
                <Product
                    id={pro[0]}
                    prix={pro[1]}
                />)
              produits.unshift(<div id="collection-title">Produits</div>) 
              
              
          }
          else
              produits = [<h1>collection est vide</h1>]
            
            setProducts(Array(produits));
          })
        },[])
    
    return (
        <>
            {/* {flights && places && hotels?<><h1>Search</h1><script>{document.body.style.backgroundColor="#88adb7"}</script></>:<Loader/>} */}
            {/* {flights?flights:<span/>} */}
          
            {products}
            

        </>
    );
}
  
  export default YourProducts;