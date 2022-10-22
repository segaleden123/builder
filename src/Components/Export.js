import React, { useContext ,useEffect } from 'react'
import Button from '@mui/material/Button';
import { myContext } from '../Context/myContext'

const formattedTree = {}

const treeIndex = (tree) => {
   tree.forEach(n => {
        if (!formattedTree[n.type])
            formattedTree[n.type] = []
       if(n.type ==='Task')
       n.data['Predecessors'] = n.task.predecessor
        formattedTree[n.type].push(n.data)
        if (n.isNested) {
          return treeIndex(n.externalTree)
        }
    })
}

const Export = () => {
    const { tree,task,task1 } = useContext(myContext)
    treeIndex(tree) // chnage to tree
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({'tree':tree,'task':task,'task1':task1}));
//    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formattedTree));

    // var dlAnchorElem = document.getElementById('downloadAnchorElem');
    // dlAnchorElem.setAttribute("href", dataStr);
    // dlAnchorElem.setAttribute("download", "scene.json");
    return (
        <div>
            <a href={dataStr} download={'tree.json'} onClick={() => {
            }}><Button variant={'outlined'}>Export tree</Button></a>
        </div>
    )
}

export default Export