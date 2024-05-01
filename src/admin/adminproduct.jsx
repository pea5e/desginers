import React, { Component, useEffect, useState } from 'react';

function Product(Component) {
  return function WrappedComponent(props) {
    const [blob, setBlob] = useState('');

    useEffect(() => {
      fetch("https://api.printsplash.repl.co/tshirts/tshirt" + props.id + ".png")
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
      id: props.id,
      prix: props.prix + ".00",
      imgurl: props.imgurl
    };
  }
  render() {
    return (
      <div className="tshirt" >
        <input type="hidden" className="checkbox" value={this.state.id} />
        <img className="tshirtimg" src={blobs[this.state.id]} />
        <input className="tshirtprice" type="number" readOnly value={this.state.prix} />
        <i className="fa-solid fa-trash tbutton" onClick={this.remove}></i>


      </div>
    );
  }

  remove(ele) {
    var tid = ele.target.parentElement.getElementsByClassName("checkbox")[0].value;
    ele.target.parentElement.remove();
    let cook = document.cookie.replaceAll('; ', '=').split('=');
    const security = cook[cook.indexOf("security") + 1];
    fetch("https://api.printsplash.repl.co/delete",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "tshirt_id": tid,
          "secret_key": security
        }),
      })
  }


}

export default Product(Hookproduct);