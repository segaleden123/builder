import React from 'react'
import ToolbarIcon from './ToolbarIcon'
const Toolbar = () => {
    const toolbarItems = [
        { name: 'Add resource type', picture: 'https://img.icons8.com/officel/80/000000/add-user-male.png', type: 'modal',modalType:'add' },
        { name: 'Add quality', picture: 'https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-quality-food-technology-wanicon-lineal-color-wanicon.png', type: 'modal',modalType:'add' },
        { name: 'Add project', picture: 'https://img.icons8.com/nolan/50/project-management.png', type: 'modal',modalType:'add' },
        { name: 'Add task', picture: 'https://cdn-icons-png.flaticon.com/512/3003/3003214.png', type: 'modal',modalType:'add' },
        { name: 'Add quality parameter', picture: 'https://cdn-icons-png.flaticon.com/512/3003/3003214.png', type: 'modal',modalType:'add' },
        { name: 'Add mode', picture: 'https://cdn-icons-png.flaticon.com/512/3003/3003214.png', type: 'modal',modalType:'add' },
        { name: 'Add scenario information', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'modal',modalType:'add' },
        { name: 'Delete resource type', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'delete' },
        { name: 'Delete resource type', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'delete' },
        { name: 'Delete quality parameter', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png' },
        { name: 'Delete project', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'delete' },
        { name: 'Delete quality parameter', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'delete' },
        { name: 'Delete mode', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'delete' },
        { name: 'Refresh network', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'general' },
        { name: 'Help', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'general' },
        { name: 'Tutorial test', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'general' },
        { name: 'Tutorial video', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'general' },
        { name: 'Company website', picture: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_add.png', type: 'general' },
        { name: 'About', picture: 'https://img.icons8.com/office/40/000000/about.png', type: 'modal' }]
    return <>
        <div className='toolbar' style={{ height: '10vh', display: 'flex' }}>
            <div style={{ height: '8vh', display: 'flex', flexDirection: 'row' }}>
                {toolbarItems.map(info => {
                    return <ToolbarIcon info={info} />
                })}
            </div>
        </div>

    </>
}

export default Toolbar