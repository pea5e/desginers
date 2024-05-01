import React,{Component, useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import { Chart as ChartJS,  CategoryScale} from "chart.js/auto";
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale);

function Analytics() {
    const [profit,setProfits] = useState([]);
    const [unites,setUnites] = useState([]);



  
    useEffect(()=>{
        var today = new window.Date();
        let cook = document.cookie.replaceAll('; ','=').split('=');
        var url ;
        var data;
        if(location.href.includes('admin'))
        {
          url = "https://api.printsplash.repl.co/getstats"
          data = {
            "type":"admin"
          }
        }
        else
        {
          var email = cook[cook.indexOf("email")+1];
          const security = cook[cook.indexOf("security")+1];
          url =  "https://api.printsplash.repl.co/getmystats";
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
          setProfits(resp["profit"]);
          setUnites(resp["unites"]);
          })
        },[])

  var today = new window.Date();
  var dates = [ (new Date(today.getTime() - 4 * 86400000)).toString().substring(4,15), (new Date(today.getTime() - 3 * 86400000)).toString().substring(4,15), (new Date(today.getTime() - 2 * 86400000)).toString().substring(4,15), (new Date(today.getTime() - 1 * 86400000)).toString().substring(4,15), today.toString().substring(4,15)];
  const datapiece = {
            labels: dates,
             datasets: [
               {
                 label: "nombre de pièces",
                 data: unites,
                 borderColor: "rgba(75,192,192,1)"
               },
             ]
           }
    const dataprofit = {
      labels: dates,
       datasets: [
         {
            label: "profit de jour",
            data: profit,
            borderColor: "#742774"
          }
       ]
     }
   

  
    return (
        <>
            <Line 
              data={datapiece}
            />
            <Line className="chart"
              data={dataprofit}
            />
        </>
    );
}
  
  export default Analytics;