import React,{useContext} from 'react'
import Bluediv from '../styledComponents/blueDiv'
import DataForm from './DataForm'
import { myContext } from '../Context/myContext'

const Data = () => {
const { node, dataForm } = useContext(myContext)
    return <>
        <div className='shadowBox' style={{height:'50%', zIndex: 500}}>
            <Bluediv label="Data"/>
            <DataForm data={node} dataForm={dataForm}/>
        </div>
    </>
}

export default Data