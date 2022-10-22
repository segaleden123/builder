import React from 'react'
import ToolbarIcon from './ToolbarIcon'
import { toolbarItems} from '../assests/toolbar'

const Toolbar = () => {
    return <>
        <div className='toolbar' style={{ height: '10vh', display: 'flex' }}>
            <div style={{ height: '8vh', display: 'flex', flexDirection: 'row' }}>
                {toolbarItems.map(info => {
                    return < ToolbarIcon info={info} />
                })}
            </div>
        </div>
    </>
}

export default Toolbar