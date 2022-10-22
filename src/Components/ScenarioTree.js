import React, { useContext, useEffect } from 'react'
import { myContext } from '../Context/myContext'
import Bluediv from '../styledComponents/blueDiv'
import Export from './Export'
import Import from './Import'
import CustomizedTreeView from './Tree'
import Button from '@mui/material/Button';

const ScenarioTree = ({ setTask1 }) => {
    const { tree, setTree, setTask, node } = useContext(myContext)

    useEffect(() => {
        if (tree.length !== 0)
            localStorage.setItem('tree', JSON.stringify(tree))
    }, [tree])

    return <>
        <div className='shadowBox' style={{ height: '100%', position: 'relative' }}> <Bluediv label="Scenario Tree" />
            <CustomizedTreeView tree={tree}></CustomizedTreeView>
            <div style={{ position: 'absolute', display: 'flex', bottom: '0', flexDirection: 'column', width: '100%', padding: '2%', left: '0' }}>
                <div style={{padding:'5px'}}>
                    <Import/>
                </div>
                <div style={{ display: 'flex',justifyContent:'space-around' }}>
                    <div >
                        <Button
                            onClick={() => {
                                setTree([{ label: 'Main', nodeId: '1', isNested: false, type: 'Main', data: {} }])
                                localStorage.removeItem('tree')
                                localStorage.removeItem('tasks')
                                localStorage.removeItem('task1')
                                setTask([])
                                setTask1([])
                                if (node) node["task"] = { 'available': [], 'predecessor': [] } }}
                            variant={'outlined'}> Delete local storage</Button></div>
                    <Export/>
                </div>
            </div>
        </div>
    </>
}

export default ScenarioTree