import React ,{Component, useEffect, useState} from 'react';



function Best(props) {
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
      <div className="best" >
        <img src={blob} />
        <h2 >quantité: {props.qte}</h2>
        <h2 >Total:{props.prix}</h2>
      </div>
  )
}

export default Best;