import React, { useState, useEffect, useContext } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { myContext } from '../Context/myContext'

const DataForm = (props) => {
    const { node, setNode,scenario,setScenario,setTree } = useContext(myContext)
  
    const handleScenario = (e) => {
        setScenario(e.target.value)
        setNode(prevNode => {
            let obj = prevNode
            obj.label=e.target.value
            return obj
        })
      
    
    }
    useEffect(()=>{
      
    },[])
    return <>
        <div className='dataForm'>
            <Form>
                <Form.Field>
                    <label>Scenario Name</label>
                    <input placeholder='Scenario' onChange={handleScenario} value={scenario} />
                </Form.Field>

                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>


    </>
}

export default DataForm