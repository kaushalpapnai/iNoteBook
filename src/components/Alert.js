import React from 'react'

export default function Alert(props) {
    const capitalized = (word)=>{

      if(word === "danger"){
        word = "error"
      }


        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div style={{height:"50px"}}>
 {
   props.alert && <div className='mt-5'>
       <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalized(props.alert.type)}</strong> : {props.alert.massege}
        </div>
      
    </div>
 }
 </div>
  )
}


























