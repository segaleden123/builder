/* eslint-disable no-lone-blocks */
import React, { useState, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { TextField } from '@mui/material'
import { myContext } from '../Context/myContext'


const ToolbarIcon = (props) => {
  const [show, setShow] = useState(false);
  const [addScenarioName, setAddScenarioName] = useState('');

  const {  node, treeChanger, setTask1, task1 } = useContext(myContext)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleFunc = (changeType) => {
    console.log(changeType)
    let workingNode = node
    if (props.info.itemType === 'Task') {
      let arr = task1
      arr.push({ "label": addScenarioName, "isPredecessor": false })
      setTask1(arr)
    }
    treeChanger(addScenarioName, workingNode, changeType, props.info.itemType)
  }

  const modalCreator = () => {
    console.log('props.info', props.info)
    let workingNode = node
    if (props.info.modalType === 'add')
      return (<>
      <Modal.Header closeButton  >
        <Modal.Title>{props.info.name}</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <TextField style={{ width: "100%" }} onChange={(e) => {
            setAddScenarioName(e.target.value)
          }} id="standard-basic" label={props.info.name} variant="standard" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            handleFunc('add')
          }} variant="primary">Add</Button>
        </Modal.Footer>
      </>)
    else if (props.info.itemType === "tutorial-video") return(<>
      <Modal.Header closeButton>
        <Modal.Title>TUTORIAL VIDEO</Modal.Title>
      </Modal.Header>
        <Modal.Body><a href='https://www.youtube.com/watch?v=U7gbOIvDUVI&feature=youtu.be'>PTB Scenario Builder Tutorial</a>
        </Modal.Body>
      </>)
    else return (<>
    <Modal.Header closeButton>
      <Modal.Title>ABOUT SCENARIO BUILDER</Modal.Title>
    </Modal.Header>
      <Modal.Body><div>Scenario builder, version 1.0</div>
        <a href='https://www.sandboxmodel.com/'>https://www.sandboxmodel.com/</a>
      </Modal.Body>
    </>)
  }

  const checkValidity = (itemType) => {
    switch (itemType) {
      case 'Resource': {   
        if (node.type === 'Main') 
          return true
      } break;
      case 'Project': {   
        if (node.type === 'Main')  
          return true
      } break;
      case 'Quality requirement': {   
        if (node.type === 'Project')  
          return true
      } break;
      case 'Task': {   
        if (node.type === 'Project')  
          return true
      } break;
      case 'Mode': {   
        if (node.type === 'Task')  
          return true
      } break;
      case 'Quality parameter': {   
        if (node.type === 'Task')  
          return true
      } break;
      default: {return true} break
    }
  }
  const clickToolbarHandler = () => {

    switch (props.info.type) {
      case 'modal':
        if (show === false && checkValidity(props.info.itemType)) {
          handleShow()
        } break;
      case 'delete':
        handleFunc('delete')
        break;
      case 'link':
        break;
      default:
        break;
    }
  }
  return (
  <>
    <div className={`${checkValidity(props.info.itemType) && 'toolbarIconContainerHover'} toolbarIconContainer `} onClick={clickToolbarHandler}>
      <img className='toolbarIcon' alt='' src={props.info.picture}></img>
      <label className='toolbarLabel' >{props.info.name}</label>
    </div>

    <Modal show={show} onHide={handleClose} animation={true}>
      {modalCreator()}
    </Modal>
  </>
  )
}
export default ToolbarIcon

