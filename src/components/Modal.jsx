import React, { useState } from 'react'
import ReactDom from 'react-dom'
import BookDetail from "./BookDetail";

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: "600px",
  maxWidth: "100%",
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#242323',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,

  filter:"blur(10px)",
  
}

export default function Modal({ open, selectedID,setSelectedID, onClose }) {
const [isLoad, setIsLoad] = useState(false);

  

  if (!open ) return null
  
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="bookDetail"> 
        <BookDetail selectedID={selectedID}
         setSelectedID={setSelectedID}
         setIsLoad={setIsLoad}/> 
      </div>
      <button onClick={onClose} >Close</button>
      </div>
    </>,
    document.getElementById('portal') 
  )
}
