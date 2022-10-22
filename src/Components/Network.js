import React, { useState, useEffect, useContext, useRef } from 'react'
import { myContext } from '../Context/myContext'
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'react-flow-renderer';
import Bluediv from '../styledComponents/blueDiv'

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const Network = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
    const { task, tree } = useContext(myContext)

    const graphNodeHandler = (prev) => {
        if (prev.length !== task.length) {
            let myNodes = task.map((t, index) => {

                let graphNode = {
                    id: t.label,
                    data: {
                        label: (
                            <>
                                {t.label}
                            </>
                        ),
                    },
                    position: { x: 100 + index * 100, y: index * 50 }

                }

                if (prev[index]){
                    let position = { x: prev[index].position.x, y: prev[index].position.y }
                    graphNode.position=position
                }
                return graphNode
            })
            return myNodes
        }
        else
            return [...prev]
    }

    const graphEdgeHandler = () => {
        let myEdges = []
        task.forEach(t => {
            if (t.task.predecessor)
                t.task.predecessor.forEach(pre => {
                    let graphEdge = {
                        id: `e${t.label}-${pre.label}`,
                        source: t.label,
                        target: pre.label,
                        animated: true,
                        label: `${pre.label} predecessor of ${t.label}`
                    }
                    myEdges.push(graphEdge)
                })
        })
        return myEdges
    }

    useEffect(() => {
        console.log('changed')
        setNodes(prev => graphNodeHandler(prev))
        setEdges(graphEdgeHandler())
    }, [tree])

    return <>
        <div className='shadowBox' style={{ height: '50%' }}>
            <Bluediv label="Network" />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
            >
                {/* <MiniMap
                    nodeStrokeColor={(n) => {
                        if (n.style?.background) return n.style.background;
                        if (n.type === 'input') return '#0041d0';
                        if (n.type === 'output') return '#ff0072';
                        if (n.type === 'default') return '#1a192b';
                        return '#eee';
                    }}
                    nodeColor={(n) => {
                        if (n.style?.background) return n.style.background;

                        return '#fff';
                    }}
                    nodeBorderRadius={2}
                /> */}
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>


    </>
}

export default Network