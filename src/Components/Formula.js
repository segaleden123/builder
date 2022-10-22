import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import { Button } from 'semantic-ui-react'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { functions } from '../assests/available-functions'
import { myContext } from '../Context/myContext'

const Formula = ({setQualityParameter}) => {
    const { node, tree } = useContext(myContext)
    const [openQp, setOpenQp] = useState(false)
    const [openFunctions, setOpenFunctions] = useState(false)
    const toggleQp = () => setOpenQp(!openQp);
    const toggleFunctions = () => setOpenFunctions(!openFunctions);
    const qualityParameter = []

    useEffect(()=> {
            setQualityParameter(qualityParameter)
    },[node]); 

    return <>
        <div className='p-3'>
            To define a formula use parameters defined in tasks, in square brackets, e.g "[B] + Sqrt([c]) +Sin([W1])"
            <Button onClick={toggleQp}  id="Popover1"  className='m-1' style={{width: "20%"}}>Available Parameters</Button>
                <Popover placement="bottom" target="Popover1" isOpen={openQp}  toggle={toggleQp}>
                <PopoverHeader>Info</PopoverHeader>
                <PopoverBody>
                    {
                    tree.map((nodes) => {
                        return (
                            <> { nodes.externalTree?.map((inner) => {
                                if (inner.type === 'Project') {  
                                    inner.externalTree?.map((innerProj)=> {
                                        if (innerProj.type === 'Task') {
                                            innerProj.externalTree?.map((innerTask) => {
                                                if (innerTask.type === 'Quality parameter') {
                                                    qualityParameter.push(innerTask.label)
                                                }
                                            })
                                        }
                                    })
                                }
                            })}
                                {qualityParameter}<br/>
                            </>
                        )
                    })
                    }
                </PopoverBody>
            </Popover>

            <Button id="Popover2" onClick={toggleFunctions} style={{width: "20%"}}>Available Function</Button>
            <Popover placement="bottom" target="Popover2" isOpen={openFunctions}  toggle={toggleFunctions}>
                <PopoverHeader>Info</PopoverHeader>
                <PopoverBody>
                    {
                        functions.map((val) => {
                            return (
                                <>
                                    {val}<br/>
                                </>
                                )
                        })
                    }
                </PopoverBody>
            </Popover>
        </div>
    </>
}

export default Formula


