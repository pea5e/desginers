import React ,{Component, useEffect, useState} from 'react';

function Product(Component) {
  return function WrappedComponent(props) {
    const [blob, setBlob] = useState('');

    useEffect(() => {
        fetch("https://api.printsplash.repl.co/tshirts/tshirt"+ props.id+".png")
        .then(response => response.blob())
        .then(b => {
          blobs[props.id] = URL.createObjectURL(b);
          setBlob(blobs[props.id]);
        })
    }, []);
    return <Component {...props} imgurl={blob} />;
  }
}

class Hookproduct extends Component {
  constructor(props) {
    super();
    this.state = {
      id : props.id,
      prix : props.prix-60+".00",
      imgurl : props.imgurl 
    };
    this.changeprix = this.changeprix.bind(this);
    this.changed = false;
  }
   render() {
    return (
      <div className="tshirt" >
            <input type="hidden"  className="checkbox" value={this.state.id}/>
            <img className="tshirtimg" src={blobs[this.state.id]}/>
            <input className="tshirtprice" type="number" onInput={this.changeprix} readOnly onBlur={this.readprix} value={this.state.prix} max={140} />
            <i className="fa-solid fa-pen-to-square tbutton" onClick={this.writeprix}></i>
            <i className="fa-solid fa-trash tbutton" onClick={this.remove}></i>
            
            
      </div>
    );
  }

  writeprix(ele)
  {
      var prix = ele.target.parentElement.getElementsByClassName("tshirtprice")[0];
      prix.readOnly = false;
      prix.focus();
      prix.value="";
  } 

  readprix(ele)
  {
      var inp = ele.target;
      inp.readOnly = true;
      var tid = inp.parentElement.getElementsByClassName("checkbox")[0].value;
      var prix = inp.value;
      inp.value +='.00';
      let cook = document.cookie.replaceAll('; ','=').split('=');
      const security = cook[cook.indexOf("security")+1];
      fetch("https://api.printsplash.repl.co/update",
            {
                method: "POST", 
                mode: "cors", 
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "tshirt_id":tid,
                  "prix": parseFloat(prix)+60,
                  "secret_key" : security
                }),
            })
  }

  changeprix(ele)
  {
    var val = ele.target.value;
    if (val>140)
    {
      val = 140;
    }
    this.setState({
      prix: val
    })
    this.changed = true;
  }

  remove(ele)
  {
    var tid = ele.target.parentElement.getElementsByClassName("checkbox")[0].value;
    ele.target.parentElement.remove();
    let cook = document.cookie.replaceAll('; ','=').split('=');
    const security = cook[cook.indexOf("security")+1];
    fetch("https://api.printsplash.repl.co/delete",
          {
              method: "POST", 
              mode: "cors", 
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "tshirt_id":tid,
                "secret_key" : security
              }),
          })
  }
  
  
}

export default Product(Hookproduct);