import React from 'react'
import './Designers.css'
import Create from './create'
import {Helmet} from "react-helmet";
import YourProducts from './myproducts'
import Yoursales from './mysales'
import Loading from './loading'
import Stats from './stats'

export default function Designers() {
  return(
      <>
        <Helmet>
          <script>
            if (! document.cookie.includes("email"))
              location.href = "/login"
          </script>
        </Helmet> 
        <aside>
          <a href="/designers" className="logo">
            <img id="logo" src="logo.png" /> <span>Designers</span>
          </a>
          <nav>
            <ul>
              <li>
                <span className="material-symbols-outlined">draw</span>Créer
                <div className="layer" >
                  <Create />
                  <Loading />
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined">styler</span>Vos produits
                <div className="layer yourproduct"  >
                  <YourProducts />
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined">timeline</span>Historique de
                ventes
                <div className="layer yourproduct">
                  <Yoursales/>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined">
                query_stats
                </span>Statistiques
                <div className="layer yourproduct">
                  <Stats/>
                </div>
              </li>
              
              <li id="logout">
                <span className="material-symbols-outlined">logout</span>Log Out
              </li>
            </ul>
          </nav>
        </aside>
        <Helmet>
            <script src="scriptdashboard.js"></script>
        </Helmet>

    </>
    );
}


function unload(e){
  console.log(e.currentTarget);
  e.currentTarget.style.display = "flex";
  e.currentTarget.parentElement.getElementsByClassName("loader")[0].style.display="none";
}