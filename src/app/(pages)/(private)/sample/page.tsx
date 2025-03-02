"use client";
import Header from "@/components/header";
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useCallback, useMemo } from "react";

const initialData = {
  "template": {
    "parent1": {
      "id": "uuid1",
      "name": "Parent1",
      "fieldType": "string",
      "children": [
        {
          "temp1": {
            "id": "uuid2",
            "name": "Temp1",
            "fieldType": "string"
          }
        }
      ]
    },
    "parent2": {
      "id": "uuid3",
      "name": "Parent2",
      "fieldType": "string",
      "children": [
        {
          "temp1": {
            "id": "uuid4",
            "name": "Temp1",
            "fieldType": "string"
          }
        }
      ]
    }
  }
};

// Recursive function to generate tree data (nodes and edges)
const generateReactFlowData = (data: any) => {
  let nodes:any = [];
  let edges: any = [];
  let idCounter = 1;

  // Recursive function to traverse nodes and create data
  const generateNodes = (parentNode: any, parentPosition: { x: number; y: number }, depth: number) => {
    const parent = {
      id: parentNode.id,
      data: { label: parentNode.name },
      position: { x: parentPosition.x, y: parentPosition.y },
      type: 'default',
    };
    nodes.push(parent);

    if (parentNode.children) {
      parentNode.children.forEach((childObj: any, idx: number) => {
        const childKey = Object.keys(childObj)[0];
        const child = childObj[childKey];

        const childNode = {
          id: child.id,
          data: { label: child.name },
          position: { x: parentPosition.x + 200, y: parentPosition.y + (idx * 150) }, // Adjust Y for children
          type: 'default',
        };
        nodes.push(childNode);

        // Create an edge from the parent to the child
        const edge = {
          id: `e${parentNode.id}-${child.id}`,
          source: parentNode.id,
          target: child.id,
          animated: true,
        };
        edges.push(edge);

        // Recursively generate nodes for the children
        generateNodes(child, { x: parentPosition.x + 200, y: parentPosition.y + (idx * 150) }, depth + 1);
      });
    }
  };

  // Start generating the nodes from the root parent nodes
  for (const parentKey in data.template) {
    const parent = data.template[parentKey];
    generateNodes(parent, { x: 100 * idCounter, y: 100 }, 1);
    idCounter++;
  }

  return { nodes, edges };
};

export default function Sample() {
  const { nodes, edges } = useMemo(() => generateReactFlowData(initialData), []);
  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback((param: any) => setEdges((eds) => addEdge(param, eds)), [setEdges]);

  return (
    <div className="flex flex-col flex-1 h-screen">
      <Header />
      <main className="flex flex-1 flex-col gap-6 overflow-auto p-4">
        <div style={{ width: '100vw', height: '100vh' }}>
          <ReactFlow nodes={reactFlowNodes} edges={reactFlowEdges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}>
            <Controls />
            <MiniMap />
            <Background variant="lines" gap={12} size={1} />
          </ReactFlow>
        </div>
      </main>
    </div>
  );
}
