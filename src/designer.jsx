import React ,{Component, useEffect, useState} from 'react';



function Designer(props) {
    
    return (
      <tr >
        <td >{props.name}</td>
        <td >{props.email}</td>
        <td >{props.qte}</td>
      </tr>
  )
}

export default Designer;