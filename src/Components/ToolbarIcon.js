import React, { useState, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { TextField } from '@mui/material'
import { myContext } from '../Context/myContext'
const ToolbarIcon = (props) => {

  const [show, setShow] = useState(false);
  const [addScenarioName, setAddScenarioName] = useState('');

  const { tree, setTree, node, setNode, treeChanger } = useContext(myContext)
  const handleClose = () => {

    setShow(false)

    console.log('close')
  };
  const handleShow = () => {
    console.log('show')
    setShow(true)
  }


  const treeRecursion = (tree, newNode) => {
    tree.forEach(n => {
      if (n.isNested) {
        n.externalTree.push(newNode)
        return treeRecursion(n.externalTree, newNode)
      }

    })
  }
  const handleFunc = (changeType) => {
    let workingNode = node
    console.log(node)
    treeChanger(addScenarioName, workingNode,changeType)



  }
  const modalCreator = () => {

    if (props.info.modalType === 'add')
      return (<><Modal.Header closeButton>
        <Modal.Title>{props.info.name}</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <TextField style={{ width: "100%" }} onChange={(e) => {
            setAddScenarioName(e.target.value)

          }} id="standard-basic" label={props.info.name} variant="standard" />

        </Modal.Body>
        <Modal.Footer>

          <Button onClick={()=>{
            handleFunc('add')
          }} variant="primary">Add</Button>
        </Modal.Footer>
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
      case 'delete':
        
          handleFunc('delete')

        break;
      default:

        break;
    }

  }
  return (<>

    <div className='toolbarIconContainer' onClick={clickToolbarHandler}>
      <img className='toolbarIcon' alt='' src={props.info.picture}></img>

      <label className='toolbarLabel' >{props.info.name}</label>

    </div>

    <Modal show={show} onHide={handleClose} animation={true}>
      {modalCreator()}
    </Modal>


  </>)
}

export default ToolbarIcon

