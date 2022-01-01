import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import {TextField} from '@mui/material'
const ToolbarIcon = (props) => {

  const [show, setShow] = useState(false);
  const handleClose = () => {

    setShow(false)

    console.log('close')
  };
  const handleShow = () => {
    console.log('show')

    setShow(true)
  }

  const modalCreator = () => {
    
    if (props.info.modalType === 'add')
      return (<><Modal.Header closeButton>
        <Modal.Title>{props.info.name}</Modal.Title>
      </Modal.Header>
        <Modal.Body>
        <TextField style={{width:"100%"}} id="standard-basic" label={props.info.name } variant="standard" />

        </Modal.Body>
      </>)
      else return (<><Modal.Header closeButton>
        <Modal.Title>ABOUT SCENARIO BUILDER</Modal.Title>
      </Modal.Header>
        <Modal.Body><div>Scenario builder, version 1.0</div>
          <a href='https://www.sandboxmodel.com/'>https://www.sandboxmodel.com/</a>


        </Modal.Body>
      </>)
  }

  const clickToolbarHandler = () => {
    switch (props.info.type) {
      case 'modal':
        if (show === false)
          handleShow()

        break;
      default:

        break;
    }

  }
  return (<>

    <div className='toolbarIconContainer' onClick={clickToolbarHandler}>
      <img className='toolbarIcon' alt='' src={props.info.picture}></img>

      <label className='toolbarLabel' >{props.info.name}</label>
      <Modal show={show} onHide={handleClose} animation={true}>
        {modalCreator()}
      </Modal>
    </div>




  </>)
}

export default ToolbarIcon

