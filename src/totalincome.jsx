import React,{Component, useEffect, useState} from 'react';


function Income() {
    const [income,setIncome] = useState(null);
  
    useEffect(()=>{
        let cook = document.cookie.replaceAll('; ','=').split('=');
        var url ;
        var data;
        if(location.href.includes('admin'))
        {
          url = "https://api.printsplash.repl.co/getprofit"
          data = {
            "type":"admin"
          }
        }
        else
        {
          var email = cook[cook.indexOf("email")+1];
          const security = cook[cook.indexOf("security")+1];
          url =  "https://api.printsplash.repl.co/getmyprofit";
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
          var profit;
          if (resp["response"] == 200){
            
            profit = <div className="total-income">
                <h2>Total Income:{resp["profit"]}</h2>
                <h2>Votre profit:{resp["profit"]-resp["our-gain"]}</h2>
              </div>
              
          }
          else
            profit = <div className="total-income">
              <h2>Total Income:0</h2>
              <h2>Votre profit:0</h2>
            </div>
          
            setIncome(profit);
          })
        },[])
    
    return (
        <>
            
          {income}

        </>
    );
}
  
  export default Income;