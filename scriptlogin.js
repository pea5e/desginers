document.cookie = "nom=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "security=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


var namesign  = document.getElementsByClassName("name-sign")[0];

namesign.oninput = () => {
    var val = namesign.value;
    var error = namesign.parentElement.getElementsByClassName("name-error")[0];
    namesign.style.border = ""
    error.innerHTML = "";
    if (! isLetter(val.substring(val.length-1,val.length)))
    {
        error.innerHTML = "caractères spéciaux ne sont pas autorisés dans les noms";
        namesign.style.border = "1px solid red"
        namesign.value = val.substring(0,val.length-1);
    }
};

namesign.onchange = () => {
    var error = namesign.parentElement.getElementsByClassName("name-error")[0];
    namesign.style.border = ""
    error.innerHTML = "";
}

function isLetter(str) {
    return str.match(/[a-zA-Z ]/i)!=null;
  }



  var emailsign  = document.getElementsByClassName("email-sign")[0];

emailsign.oninput = () => {
    var val = emailsign.value;
    var error = passwordsign.parentElement.getElementsByClassName("email-error")[0];
    emailsign.style.border = ""
    error.innerHTML = "";
}

  emailsign.onchange = () => {
    var val = emailsign.value;
    var error = emailsign.parentElement.getElementsByClassName("email-error")[0];
    emailsign.style.border = ""
    error.innerHTML = "";
      if (! isMail(val))
      {
          error.innerHTML = "entrez un email valide";
          emailsign.style.border = "1px solid red";
          emailsign.value = val.substring(0,val.length-1);
      }
      else{
        fetch("https://api.printsplash.repl.co/usedmail",
        {
            method: "POST",
            mode: "cors", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"email":val}),
        }).then( response => 
                response.json()
            ).then( (data) => { if (data["response"]!=200)
            {
               error.innerHTML = "cet mail est déjà utilisé";
               emailsign.style.border = "1px solid red";
               emailsign.value = val.substring(0,val.length-1);
            }   
        })
      }
  };
    
  function isMail(str) {
    return str.match(/^[a-zA-Z0-9.-_]+@[a-zA-Z]+\.[a-zA-Z]+$/i)!=null;
  }



  var passwordsign  = document.getElementsByClassName("password-sign")[0];

  passwordsign.oninput = () => {
      var val = passwordsign.value;
      var error = passwordsign.parentElement.getElementsByClassName("password-error")[0];
      passwordsign.style.border = ""
      error.innerHTML = "";
  }
  
  passwordsign.onchange = () => {
      var val = passwordsign.value;
      var error = passwordsign.parentElement.getElementsByClassName("password-error")[0];
      if(val.length<=8)
        {
            passwordsign.style.border = "1px solid red"
            error.innerHTML = "Mot de passe doit contenir au minimum 8 caractères";
        }
    };



    document.getElementsByClassName("signup-btn")[0].onclick = () => {
            if (passwordsign.style.border == "" && emailsign.style.border == "" && passwordsign.value!="" && emailsign.value!="" && namesign.value!=""  )
            {
                
                fetch("https://api.printsplash.repl.co/signup",
                {
                    method: "POST", 
                    mode: "cors", 
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"email":emailsign.value,"nom":namesign.value,"password":passwordsign.value,"secret_key":"leF_7U2f2XPk1HxS07PPskuWmQE76VJA-5b3XmIE4C4="}),
                }).then( response => 
                        response.json()
                    ).then( (data) => { if (data["response"]==200)
                    {
                       document.cookie = document.cookie = `security=${data["security_key"]}; expires=Thu, 03 Jan 2030 00:00:00 UTC; path=/;`;
                        document.cookie = `nom=${namesign.value}; expires=Thu, 03 Jan 2030 00:00:00 UTC; path=/;`;
                        document.cookie = `email=${emailsign.value}; expires=Thu, 03 Jan 2030 00:00:00 UTC; path=/;`;
                        location.href = "/";                      
                    }   
                })
                return 0;

            }
            if (passwordsign.value=="" )
                passwordsign.style.border = "1px solid red";
            if ( emailsign.value=="" )
                emailsign.style.border = "1px solid red";
            if ( namesign.value=="")
                namesign.style.border = "1px solid red";
            }

function showpass(ele){
    // var ele =  document.getElementsByClassName(form)[0].getElementsByClassName('eye')[0];
    if (ele.getElementsByTagName('i')[0].className == "fa-regular fa-eye")
    {
        inputs  = ele.parentElement.getElementsByTagName('input')
        inputs[inputs.length-1].type = "text";
        ele.getElementsByTagName('i')[0].className = "fa-regular fa-eye-slash";
    }
    else {
        inputs  = ele.parentElement.getElementsByTagName('input')
        inputs[inputs.length-1].type = "password";
        ele.getElementsByTagName('i')[0].className = "fa-regular fa-eye";
    }
}




var emaillog  = document.getElementsByClassName("email-log")[0];


emaillog.onchange = () => {
    var val = emaillog.value;
    var error = emaillog.parentElement.getElementsByClassName("email-error")[0];
    emaillog.style.border = ""
    error.innerHTML = "";
        fetch("https://api.printsplash.repl.co/usedmail",
        {
            method: "POST",
            mode: "cors", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"email":val}),
        }).then( response => 
                response.json()
            ).then( (data) => { if (data["response"]==200)
            {
               error.innerHTML = "cet email n'existe pas";
               emaillog.style.border = "1px solid red";
               emaillog.value = val.substring(0,val.length-1);
            }   
        })
  };


  var passwordlog  = document.getElementsByClassName("password-log")[0];

  document.getElementsByClassName("login-btn")[0].onclick = () => {
    if ( passwordlog.value!="" && emaillog.value!=""  )
    {
        
        fetch("https://api.printsplash.repl.co/login",
        {
            method: "POST", 
            mode: "cors", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"email":emaillog.value,"password":passwordlog.value}),
        }).then( response => 
                response.json()
            ).then( (data) => { 
            if (data["response"]==200)
            {
                document.cookie = `nom=${data["nom"]}; expires=Thu, 03 Jan 2030 00:00:00 UTC; path=/;`;
                document.cookie = `email=${data["email"]}; expires=Thu, 03 Jan 2030 00:00:00 UTC; path=/;`;
                document.cookie = `security=${data["security_key"]}; expires=Thu, 03 Jan 2030 00:00:00 UTC; path=/;`;
                
                location.href = "/";
                
            }
            else if ( data["response"]==401)
            {
                passwordlog.style.border = "1px solid red";
                passwordlog.parentElement.getElementsByClassName("password-error")[0].innerHTML = "mot de passe incorrect";
            }
        })
        return 0;
    }
    if (passwordlog.value=="" )
        passwordlog.style.border = "1px solid red";
    if ( emaillog.value=="" )
        emaillog.style.border = "1px solid red";

    }
