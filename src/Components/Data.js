import React,{useContext} from 'react'
import Bluediv from '../styledComponents/blueDiv'
import DataForm from './DataForm'
import { myContext } from '../Context/myContext'
const Data = () => {
const {node,tree,setTree}=useContext(myContext)

    return <>
    <div className='shadowBox' style={{height:'50%'}}>    <Bluediv label="Data"/>
    <DataForm data={node}></DataForm>
</div>
        

    </>
}

export default Data