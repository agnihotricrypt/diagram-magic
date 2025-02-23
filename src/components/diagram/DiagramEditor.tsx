
import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Node,
  NodeProps,
  OnSelectionChangeParams,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialNodes, initialEdges } from "./initial-elements";
import { ProcessNode } from "./nodes/ProcessNode";
import { DiamondNode } from "./nodes/DiamondNode";
import { CircleNode } from "./nodes/CircleNode";
import { DatabaseNode } from "./nodes/DatabaseNode";

// Define node data type that extends Record<string, unknown>
interface NodeData extends Record<string, unknown> {
  label: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
    width?: number;
    height?: number;
    rotation?: number;
  };
}

type CustomNode = Node<NodeData>;

// Register all available node types
const nodeTypes = {
  process: ProcessNode,
  diamond: DiamondNode,
  circle: CircleNode,
  database: DatabaseNode,
  ellipse: ProcessNode,
  text: ProcessNode,
  square: ProcessNode,
  cylinder: DatabaseNode,
  cloud: ProcessNode,
  parallelogram: ProcessNode,
  hexagon: ProcessNode,
  triangle: ProcessNode,
  note: ProcessNode,
  callout: ProcessNode,
  actor: ProcessNode,
  dashed: ProcessNode,
  connector: ProcessNode,
};

// Define shape-specific styles and dimensions
const shapeStyles = {
  circle: { width: 100, height: 100 },
  diamond: { width: 120, height: 120 },
  database: { width: 150, height: 100 },
  ellipse: { width: 200, height: 100 },
  text: { width: 200, height: 50 },
  square: { width: 100, height: 100 },
  cylinder: { width: 150, height: 100 },
  cloud: { width: 200, height: 120 },
  parallelogram: { width: 200, height: 100 },
  hexagon: { width: 200, height: 100 },
  triangle: { width: 100, height: 100 },
  note: { width: 150, height: 150 },
  callout: { width: 200, height: 100 },
  actor: { width: 100, height: 150 },
  dashed: { width: 200, height: 2 },
  connector: { width: 200, height: 2 },
  process: { width: 200, height: 100 },
};

export const DiagramEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodes, setSelectedNodes] = useState<Node<NodeData>[]>([]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // Handle keyboard events for deletion
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNodes.length > 0) {
        setNodes((nds) => nds.filter((node) => !selectedNodes.some((selectedNode) => selectedNode.id === node.id)));
        setEdges((eds) => eds.filter((edge) => 
          !selectedNodes.some((node) => 
            node.id === edge.source || node.id === edge.target
          )
        ));
      }
    },
    [selectedNodes, setNodes, setEdges]
  );

  // Add and remove keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      // Get the position of the drop
      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      const position = reactFlowBounds ? {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      } : { x: 0, y: 0 };

      // Get shape-specific dimensions
      const shapeStyle = shapeStyles[type] || shapeStyles.process;

      // Create new node with the dropped type and proper dimensions
      const newNode: Node<NodeData> = {
        id: `node_${nodes.length + 1}`,
        type,
        position,
        draggable: true, // Enable dragging
        selectable: true, // Enable selection
        data: { 
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodes.length + 1}`,
          style: {
            backgroundColor: 'transparent',
            color: '#000000',
            borderColor: '#000000',
            width: shapeStyle.width,
            height: shapeStyle.height,
            rotation: 0,
          }
        },
        style: {
          width: shapeStyle.width,
          height: shapeStyle.height,
          transform: `rotate(0deg)`,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  // Handle node rotation and resizing
  const onNodeDrag = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (event.shiftKey) {
        const rotation = (node.style?.transform?.match(/-?\d+/) || ['0'])[0];
        const newRotation = (parseInt(rotation) + 5) % 360;
        
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === node.id) {
              return {
                ...n,
                style: {
                  ...n.style,
                  transform: `rotate(${newRotation}deg)`,
                },
              };
            }
            return n;
          })
        );
      }
    },
    [setNodes]
  );

  // Handle node selection
  const onSelectionChange = useCallback(
    (params: OnSelectionChangeParams) => {
      setSelectedNodes(params.nodes as Node<NodeData>[]);
    },
    []
  );

  // Listen for color change events
  useEffect(() => {
    const handleColorChange = (event: CustomEvent<{ backgroundColor: string; borderColor: string }>) => {
      if (selectedNodes.length > 0) {
        setNodes((nds) =>
          nds.map((node) => {
            if (selectedNodes.some((selectedNode) => selectedNode.id === node.id)) {
              const typedNode = node as Node<NodeData>;
              return {
                ...typedNode,
                data: {
                  ...typedNode.data,
                  style: {
                    ...(typedNode.data.style || {}),
                    backgroundColor: event.detail.backgroundColor,
                    borderColor: event.detail.borderColor,
                  },
                },
              };
            }
            return node;
          })
        );
      }
    };

    window.addEventListener('changeNodeColor', handleColorChange as EventListener);
    return () => {
      window.removeEventListener('changeNodeColor', handleColorChange as EventListener);
    };
  }, [selectedNodes, setNodes]);

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
        onNodeDrag={onNodeDrag}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-muted/30"
        selectNodesOnDrag={false}
        draggable={true}
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
