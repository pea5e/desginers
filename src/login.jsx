import React from 'react'
import {Helmet} from "react-helmet";
// import 'process'

if(location.href.includes("login"))
  import('./Login.css')

// const key = process.env['secret_key'];
// console.log(key)

export default function Login() {
  return(
      <>
        <div id="login-header" />
        <header>
          <img id="logo-login" src="logo.png" /><span>Designers</span>
        </header>
        <div className="form-structor">
          <div className="signup part">
            <h2 className="form-title" id="signup">Sign up</h2>
            <div className="form-holder">
              <span className="name-error error" />
              <input type="text" name="name" className="name-sign" placeholder="Name" />
              <span className="email-error error" />
              <input type="text" name="email" className="email-sign" placeholder="Email" />
              <span className="password-error error" />
              <input type="password" name="password" maxLength={16} className="password-sign" placeholder="Password" />
              <span onClick={(event) => showpass(event.currentTarget )} className="eye"><i className="fa-regular fa-eye" /></span>
            </div>
            <button className="signup-btn submit-btn">Sign up</button>
          </div>
          <div className="login part">
            <h2 className="form-title" id="login">Log in</h2>
            <div className="form-holder">
              <span className="email-error error" />
              <input type="text" name="email" className="email-log" placeholder="Email" />
              <span className="password-error error" />
              <input type="password" name="password" maxLength={16} className="password-log" placeholder="Password" />
              <span onClick={(event) => showpass(event.currentTarget )} className="eye"><i className="fa-regular fa-eye" /></span>
            </div>
            <button className="login-btn submit-btn">Log in</button>
          </div>
        </div>
        <Helmet>
          <script src="/scriptlogin.js"></script>
        </Helmet>
      </>
    );
}