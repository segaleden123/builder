import React,{useState} from 'react'
import Maincomponent from './Maincomponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import Network from './Components/Network'
import Data from './Components/Data'
import ScenarioTree from './Components/ScenarioTree'
import Toolbar from './Components/Toolbar';
import './myStyle/myStyle.css'
import 'semantic-ui-css/semantic.min.css'
import { myContext } from './Context/myContext';
const Fullhomepage = () => {
const [node,setNode]=useState('')
const [scenario,setScenario]=useState('')
const [tree,setTree]=useState([{
    label: 'Main', nodeId: '1', isNested: true,
    externalTree: [
        { label: 'Resources', nodeId: '2', isNested: false },
        { label: 'Resources2', nodeId: '3', isNested: false },
        {
            label: 'Resources3', nodeId: '4', isNested: true,
            externalTree: [
                { label: 'Resources', nodeId: '5', isNested: false },
                { label: 'Resources2', nodeId: '6', isNested: false },]
        },

    ]
}])

    return (
        <myContext.Provider value={{node,setNode,scenario,setScenario,tree,setTree}} >
            <div>
                <Toolbar></Toolbar>
                <div style={{ display: 'flex', height: '90vh', width: '100%' }}>
                    <div style={{ display: 'flex', width: '25%', flexDirection: 'column' }}>
                        <ScenarioTree></ScenarioTree>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '75%' }}>

                        <Network></Network>
                        <Data></Data>
                    </div>


                </div>
            </div>
        </myContext.Provider>
    )
}

export default Fullhomepage
