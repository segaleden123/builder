import React, { useState } from 'react'
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
    const [node, setNode] = useState('')
    const [fck, setFck] = useState(false)
    const [scenario, setScenario] = useState('')
    const [tree, setTree] = useState([{
        label: 'Main', nodeId: '1', isNested: false,

    }])


    const treeChanger = (scenarioName, workingNode, changeType) => {
        const newNode = {}

        if (changeType == 'add') {
            newNode.isNested = false
            newNode.label = scenarioName
        }
        setTree(prevTree => {

            let number = 0

            const treeRecursion = (tree, workingNodeId, newNode) => {


                let newTree = tree.map(n => {

                    number += 1
                    n.nodeId = '' + number
                    if (n.isNested) {
                        if (n.nodeId == workingNodeId) {


                            switch (changeType) {

                                case 'add': {
                                    number += 1
                                    newNode.nodeId = '' + number
                                    n.externalTree.push(newNode)
                                } break;

                            }

                        }
                        if(changeType==='delete'){
                            n.externalTree=n.externalTree.filter(node=>node.nodeId!=workingNodeId)
                        }
                        console.log(n.externalTree, 'asdasdasdasd')
                        treeRecursion(n.externalTree, workingNodeId, newNode)
                        return n
                    }
                    else {
                        if (n.nodeId == workingNodeId) {
                            switch (changeType) {

                                case 'add': {
                                    number += 1
                                    newNode.nodeId = '' + number
                                    n.isNested = true
                                    n.externalTree = []
                                    n.externalTree.push(newNode)
                                } break;
                                case 'delete': {
                                    console.log(n)
                                }

                            }

                        }
                    }

                    console.log(n.externalTree, 'asdasdasdasd')
                    if(changeType==='delete'){
                        n.externalTree=n.externalTree.filter(node=>node.nodeId!=workingNodeId)
                    }
                    return n
                })
                return newTree
            }

            let oldTree = prevTree
            let workingNodeId = workingNode.nodeId
            if (changeType == 'delete') {

            }
            let changedTree = treeRecursion(oldTree, workingNodeId, newNode)
            console.log(changedTree)
            return [...changedTree]
        })




    }


    return (
        <myContext.Provider value={{ node, setNode, scenario, setScenario, tree, setTree, treeChanger }} >
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
