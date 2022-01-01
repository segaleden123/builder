import React,{useContext} from 'react'
import { myContext } from '../Context/myContext'
import Bluediv from '../styledComponents/blueDiv'
import CustomizedTreeView from './Tree'

const ScenarioTree = () => {
    const {tree,setTree} = useContext(myContext)

    return <>
        <div className='shadowBox' style={{ height: '100%' }}> <Bluediv label="Scenario Tree" />


            <CustomizedTreeView tree={tree}></CustomizedTreeView>



        </div>



    </>
}

export default ScenarioTree