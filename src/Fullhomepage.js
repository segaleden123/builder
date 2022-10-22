import React, { useState, useEffect } from 'react'
import Maincomponent from './Maincomponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import Network from './Components/Network'
import Data from './Components/Data'
import ScenarioTree from './Components/ScenarioTree'
import Toolbar from './Components/Toolbar';
import './myStyle/myStyle.css'
import { formType } from './assests/formData'
import Export from './Components/Export';
import 'semantic-ui-css/semantic.min.css'
import { myContext } from './Context/myContext';

const Fullhomepage = () => {

    const [node, setNode] = useState('')
    const [scenario, setScenario] = useState('')
    const [update, setUpdate] = useState(true)
    const [tree, setTree] = useState([])
    const [task1, setTask1] = useState([])
    const [tasks, setTasks] = useState([])
    const [taskArr, setTaskArr] = useState([])
    const [task, setTask] = useState([])
    const [dataForm, setDataForm] = useState(undefined)
    const [dataFormType, setDataFormType] = useState(undefined)

    const treeChanger = (scenarioName, workingNode, changeType, itemType, update = false) => {
        let newNodeID;
        const newNode = {
            label: '', isNested: false, type: undefined, data: {}
        }

        if (changeType === 'add') {
            let newFormTypeData = JSON.parse(JSON.stringify(formType[itemType]))
            newNode.isNested = false
            newNode.label = scenarioName
            newNode.type = itemType
            newNode.data = newFormTypeData
            Object.keys(newNode.data).map(key => {
                newNode.data[key].value = ''
                if (key.includes('name')) {
                    newNode.data[key].value = scenarioName
                }
            })
        }

        setTree(prevTree => {
            let number = 0
            const treeRecursion = (tree, workingNodeId, newNode) => {
                let newTree = tree.map(n => {
                    if (n.isNested) {
                        if (n.nodeId === workingNodeId) {
                            switch (changeType) {
                                // eslint-disable-next-line no-lone-blocks
                                case 'add': {
                                    //number += 1
                                    newNodeID = '' + number
                                    newNode.nodeId = '' + number
                                    n.externalTree.push(newNode)
                                } break;
                                default:
                                    // eslint-disable-next-line no-lone-blocks
                                    break;
                            }
                        }
                        else if (changeType === 'delete') {
                            n.externalTree = n.externalTree.filter(node => node.nodeId != workingNodeId)
                        }
                        else treeRecursion(n.externalTree, workingNodeId, newNode)
                        return n
                    }
                    else {
                        if (n.nodeId === workingNodeId) {
                            switch (changeType) {
                                case 'add': {
                                    // number += 1
                                    newNode.nodeId = '' + number
                                    newNodeID = '' + number
                                    n.isNested = true
                                    n.externalTree = []
                                    n.externalTree.push(newNode)
                                } break;
                                case 'delete': {
                                }
                            }
                        }
                    }
                    if (changeType === 'delete') {
                        n.externalTree = n.externalTree.filter(node => node.nodeId !== workingNodeId)
                    }
                    return n
                })
                return newTree
            }
            const treeIndex = (tree) => {
                console.log('tree dddsdddd', tree)
                let newTree = tree.map((n, index) => {
                    number += 1
                    n.nodeId = '' + number
                    console.log('node treeIndex', n)
                    if (n.type === 'Task') {
                        task1.forEach(task => {
                            if (task.label !== n.label) {
                                console.log(n)
                                taskArr.push(JSON.parse(JSON.stringify(task)))
                            }
                        })
                        n['availableTasks'] = taskArr
                        localStorage.setItem('task1', JSON.stringify(task1))
                        if (!n.task) {
                            console.log(taskArr)

                            n['task'] = { 'available': taskArr, 'predecessor': [] }
                        }
                        else {

                            n.task.available.push(taskArr[taskArr.length - 1] || [])
                        }
                        // setTask(prevTask=>[...prevTask,n])
                        tasks.push(n)
                    }
                    if (n.isNested) {
                        treeIndex(n.externalTree)
                        return n
                    }
                    return n
                })

                return newTree
            }
            let oldTree = prevTree
            let workingNodeId = workingNode.nodeId
            if (changeType === 'delete') {
            }
            let changedTree = treeRecursion(oldTree, workingNodeId, newNode)
            changedTree = treeIndex(changedTree)
            setTask(() => {
                localStorage.setItem("tasks", JSON.stringify(tasks))
                return tasks
            })
            return [...changedTree]
        })
    }

    const handleTree = (node) => {
        setTree(prevTree => {
            const treeIndex = (tree) => {
                let newTree = tree.map(n => {
                    if (n.nodeId === node.nodeId) {
                        n = node
                    } if (n.isNested) {
                        treeIndex(n.externalTree)
                        return n
                    }
                    return n
                })
                return newTree
            }
            let changedTree = treeIndex(tree)
            return [...changedTree]
        })
    }

    const getParentNode = (t) => {
        let taskFromParent = [];
        t.forEach(node => {
            if (node.isNested === true) {
                node.externalTree?.forEach(tempNode => {
                    if (tempNode.type === 'Task')
                        taskFromParent.push(tempNode)
                })
                getParentNode(node.externalTree)
            }
        })
        if (taskFromParent.length !== 0) {
            setTask(taskFromParent)
            console.log(task)
            return taskFromParent
        }
    }
    const getTreeFromLocalStorage = () => {
        const storageTree = JSON.parse(localStorage.getItem('tree'))
        if (storageTree)
            setTree(storageTree)
        else {
            setTree([{label: 'Main', nodeId: '1', isNested: false, type: 'Main', data: {} }])
        }
    }
    const getTasksFromLocalStronage = () => {
        const storageTasks = JSON.parse(localStorage.getItem('tasks'))
        if (storageTasks)
            setTask(storageTasks)
        const storageTasks1 = JSON.parse(localStorage.getItem('task1'))
        if (storageTasks1)
            setTask1(storageTasks1)
    }

    useEffect(() => {
        getTreeFromLocalStorage()
        getTasksFromLocalStronage()

    }, [])
    return (
        <myContext.Provider value={{ handleTree, update, setUpdate, node, setNode, scenario, setScenario, tree, setTask, setTree, treeChanger, setTask1, task1, dataForm, setDataForm, dataFormType, setDataFormType, getParentNode, task }} >
            <div>
                <Toolbar></Toolbar>
                <div style={{ display: 'flex', height: '90vh', width: '100%' }}>
                    <div style={{ display: 'flex', width: '20%', flexDirection: 'column' }}>
                        <ScenarioTree setTask1={setTask1} setTasks={setTasks} setTaskArr={setTaskArr}></ScenarioTree>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                        <Network></Network>
                        <Data></Data>
                    </div>
                </div>
            </div>
        </myContext.Provider>
    )
}

export default Fullhomepage
