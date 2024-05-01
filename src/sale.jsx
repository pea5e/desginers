import React ,{Component, useEffect, useState} from 'react';



function Sale(props) {
    const [blob, setBlob] = useState('');

    useEffect(() => {
      var blopUpload = setInterval(()=>{
        if(blobs[props.id])
        {
          setBlob(blobs[props.id]);
          clearTimeout(blopUpload);
        }
      }, 1000);
    }, []);
    return (
      <div className="sales">
        <img className="sales-img" src={blob} />
        <h2 className="sales-info">quantité: {props.qte}<span/>prix unitaire:{props.prix}</h2>
        <h2 className="sales-info">Total:{props.qte*props.prix}<span/>Ton Profit:{props.qte*props.prix-(60*props.qte)}</h2>
      </div>
  )
}

export default Sale;