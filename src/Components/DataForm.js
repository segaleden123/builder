import React, { useState, useEffect, useContext, useRef, useMemo } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import TaskPriority from './TaskPriority'
import { myContext } from '../Context/myContext'
import Formula from './Formula'
import _ from 'lodash'
const DataForm = (props) => {

    const { node, setNode, scenario, setScenario, dataFormType, tree, handleTree, setTree, setTask, task} = useContext(myContext)
    console.log(tree)
    const [loading, setLoading] = useState(0)
    const [qualityParameter, setQualityParameter] = useState([])
    const [PreTasks, setPreTasks] = useState([])

    useEffect(() => {

        //getTasks()
    }, [])
    const formattedQp = useMemo(() => {
        return qualityParameter.map(item => `[${item}]`)
    }, [qualityParameter]);
    const checkFormula = () => {

        const inputFormula = node.data["Define formula"].value
        let e = inputFormula.split(formattedQp).join('1')

        let replaceQp = inputFormula

        const contains = formattedQp.some(element => {
            if (inputFormula.includes(element)) {
                formattedQp.map((qp) => replaceQp = replaceQp.replaceAll(qp, '1'))
            } else {
                return false
            }
        });

        const reg = /^\s*([-+]?)(\d+)(?:\s*([-+\/])\s((?:\s[-+])?\d+)\s*)+$/

        // console.log('if', formattedQp.includes(node.data["Define formula"].value))
    }

    // useEffect(() => {

    //     //   getParentNode(tree)
    //  //   setTasks(props.data.availableTasks)
    // })
    const handleData = (e, item, priority = false, toggle) => {

        setLoading(prev => prev + 1)
        setScenario(e)
        if (!priority) {
            setNode(prevNode => {
                let obj = prevNode
                if (item.includes('name')) {
                    obj.label = e
                    obj.data[item]['value'] = e
                }
                else
                    obj.data[item]['value'] = e
                // obj.label = e.target.value
                return obj
            })
            handleTree(node)

        }
        else {
            setNode(prevNode => {


                let obj = prevNode

                obj[item] = obj[item].map(task => {
                    if (task.label === e) {
                        if (toggle === true)

                            task.isPredecessor = true
                        else
                            task.isPredecessor = false

                    }
                 
                    return task
                })

                return _.cloneDeep(obj)
            })
            handleTree(node)

        }

        setLoading(false)
    }
    const changeTaskState = (task, state) => {
        setTree(prevTree => {
            const treeIndex = (tree) => {
                let newTree = tree.map(n => {
                    if (n.nodeId === node.nodeId) {
                        if (state === 'available') {
                            n.task.available = n.task.available.filter(t => t.label !== task)
                            n.task.predecessor.push({ isPredecessor: true, label: task })
                        }
                        else {
                            n.task.predecessor = n.task.predecessor.filter(t => t.label !== task)
                            n.task.available.push({ isPredecessor: false, label: task })
                        }
                        setTask(prev=>{
                            
                            let newTasks = prev.map(t=>{
                                if(t.nodeId==n.nodeId)
                                {
                                    console.log(t,n)
                                    t=n
                                }
                                return t
                            })
                            console.log(newTasks)
                            localStorage.setItem('tasks',JSON.stringify(newTasks))
                            return newTasks
                        })

                    } if (n.isNested) {

                        treeIndex(n.externalTree)
                        return n
                    }
                    return n
                })
                //console.log(newTree)
                return newTree
            }

            let changedTree = treeIndex(prevTree)
            return [...changedTree]
        })

        console.log(tree)
    }

    if (props.dataForm === undefined)
        return <>

            <div className='dataForm'>
                <Form>
                    <Form.Field>
                        <label>Scenario Name</label>
                        <input placeholder='Scenario' onChange={handleData} value={scenario} />
                    </Form.Field>

                    <Form.Field>
                        <label>Target_Cost</label>
                        <input placeholder='Target Cost' />
                        <label>Description</label>
                        <input placeholder='Description' />
                        <label>History_Enabled</label>
                        <input placeholder='History Enabled' />
                        <label>Manual_History_Save_Enabled</label>
                        <input placeholder='Manual History Save Enabled' />
                        <label>Number_Of_Saves</label>
                        <input placeholder='Number Of Saves' />
                        <label>Number_Of_Peek</label>
                        <input placeholder='Number Of Peek' />
                        <label>Number_Of_Loads</label>
                        <input placeholder='Number Of Loads' />

                    </Form.Field>
                    <Form.Field>
                        <Checkbox Checkbox label="Load>Manual_History_Save_Enabled Enabled"
                        ></Checkbox>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox Checkbox label="Allow_Splitting_Tasks"
                        ></Checkbox>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox Checkbox label="Allow_Assigning/Releasing_Of_Resources"
                        ></Checkbox>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox Checkbox label="Load Enabled"
                        ></Checkbox>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox Checkbox label="Peek Enabled"
                        ></Checkbox>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox Checkbox label="Use_System_Engineering_Feature"
                        ></Checkbox>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox Checkbox label="Allow_Saving_Simulations"></Checkbox>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox Checkbox label="Limited_Resources"></Checkbox>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>


        </>

    else {

        if (dataFormType !== 'Task')
            return <>
                <div className='dataForm'>
                    {
                        Object.keys(node.data).map(key => {
                            return (
                                <>
                                    {
                                        key === 'Define formula' && (
                                            <>
                                                <Formula tree={tree} setQualityParameter={setQualityParameter} />
                                            </>
                                        )
                                    }
                                    <Form>
                                        <Form.Field>
                                            <label>{key}</label>
                                            <input onChange={(element) => handleData(element.target.value, key, false)} value={node.data[key].value} placeholder={key} type={node.data[key].type}
                                            />
                                            <div >
                                                {key === 'Define formula' && <Button onClick={checkFormula}>Check Formula</Button>}
                                            </div>

                                        </Form.Field>
                                    </Form>
                                </>)
                        })
                    }
                </div>
            </>
        else {


            return <>

                <div className='dataForm'>
                    <Form>
                        {
                            Object.keys(node.data).map(key => {
                                return <Form.Field key={key}>
                                    <label>{key}</label>
                                    <input onChange={(element) => handleData(element.target.value, key, false)} value={node.data[key].value} placeholder={key} type={node.data[key].type}
                                    />
                                </Form.Field>
                            })
                        }
                    </Form>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <TaskPriority handleDate={changeTaskState} state='available' toggle={true} tasks={node.task.available} priorty='Available tasks'></TaskPriority>
                        <div style={{ position: 'relative' }}>
                            <img alt='toggle' style={{ height: '24px', position: 'absolute', margin: '0', top: '50%', msTransform: 'traslateY(-50%)', transform: 'translateY(-50%)' }} src='https://img.icons8.com/ios-filled/344/double-down.png'></img>
                        </div>
                        <TaskPriority handleDate={changeTaskState} state='predecessor' toggle={false} tasks={node.task.predecessor} priorty='Predecessor tasks'></TaskPriority>
                    </div>
                </div>
            </>
        }
    }
}


export default DataForm