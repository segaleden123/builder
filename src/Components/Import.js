import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { myContext } from '../Context/myContext'

const Import = () => {
    const [importTree, setImportTree] = useState()
    const { setTask1, setTree, setTask } = useContext(myContext)

    function handleChange(event) {
        const reader = new FileReader()
        reader.onload = function (event) {
            var jsonObj = JSON.parse(event.target.result);
            setImportTree(jsonObj)
        }
        reader.readAsText(event.target.files[0]);

    }
    const loadTree = () => {
        console.log(importTree)
        if (!importTree)
            alert('no file to upload!')
        else {
            setTask(importTree.task || [])
            localStorage.setItem("tasks", JSON.stringify(importTree.task || []))

            setTask1(importTree.task1 || [])
            localStorage.setItem("task1", JSON.stringify(importTree.task1 || []))

            setTree(importTree.tree)
            localStorage.setItem("tree", JSON.stringify(importTree.tree))
        }
    }
    return (
        <div>
            <input type="file" onChange={handleChange} accept=".json" />
            <Button onClick={loadTree} variant={'outlined'}>Upload</Button>
        </div>
    )
}

export default Import