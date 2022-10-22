import React, { useState, useEffect } from 'react'

const TaskPriority = (props) => {
    let unique = []
    return <>
        <div>
            <label>{props.priorty}</label>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {
                    props.tasks.map(element => {
                        if (props.tasks.length === 0)
                            return <></>
                        else {
                            if (!unique.includes(element.label)) {
                                unique.push(element.label)
                                return <span onClick={() => {
                                    props.handleDate(element.label, props.state)
                                }
                                } style={{ width: '100%', textAlign: 'center' }} class='task'>{element.label}</span>
                            }
                        }
                    })}
            </div>
        </div>
    </>
}

export default TaskPriority
