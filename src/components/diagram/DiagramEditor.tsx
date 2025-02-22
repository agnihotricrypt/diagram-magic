
import { useCallback, useEffect } from "react";
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
  ellipse: ProcessNode, // Using ProcessNode as base for other shapes
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

export const DiagramEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodes, setSelectedNodes] = React.useState<Node[]>([]);

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

      // Get the position of the drop
      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      const position = reactFlowBounds ? {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      } : { x: 0, y: 0 };

      // Create new node with the dropped type
      const newNode = {
        id: `node_${nodes.length + 1}`,
        type,
        position,
        data: { 
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodes.length + 1}`,
          style: {
            backgroundColor: 'transparent',
            color: '#000000',
            borderColor: '#000000',
            width: 200,
            height: 100,
            rotation: 0,
          }
        },
        style: {
          width: type === 'circle' ? 100 : 200,
          height: type === 'circle' ? 100 : 100,
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
    (params: { nodes: Node[] }) => {
      setSelectedNodes(params.nodes);
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
              return {
                ...node,
                data: {
                  ...node.data,
                  style: {
                    ...node.data.style,
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
        selectNodesOnDrag={true}
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
