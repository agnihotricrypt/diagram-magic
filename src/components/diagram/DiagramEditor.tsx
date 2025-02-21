
import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialNodes, initialEdges } from "./initial-elements";
import { ProcessNode } from "./nodes/ProcessNode";
import { DiamondNode } from "./nodes/DiamondNode";
import { CircleNode } from "./nodes/CircleNode";
import { DatabaseNode } from "./nodes/DatabaseNode";

// Register all available node types
const nodeTypes = {
  process: ProcessNode,
  diamond: DiamondNode,
  circle: CircleNode,
  database: DatabaseNode,
};

export const DiagramEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = {
        x: event.clientX - 100,
        y: event.clientY - 50,
      };

      // Create new node with the dropped type
      const newNode = {
        id: `node_${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodes.length + 1}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-muted/30"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={12} 
          size={1} 
          className="!bg-background"
        />
        <Controls className="bg-background border shadow-lg" />
        <MiniMap className="!bg-background !border !shadow-lg" />
      </ReactFlow>
    </div>
  );
};
