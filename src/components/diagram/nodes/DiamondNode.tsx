
import { Handle, Position } from "@xyflow/react";

// Diamond shaped node for decision points with perfect rhombus shape
export const DiamondNode = ({ data }: { data: { label: string } }) => {
  return (
    // Using CSS to create a perfect rhombus shape with 60-degree angles
    <div className="relative w-[120px] h-[120px] rotate-45 bg-background/80 border border-opacity-40 shadow-lg">
      {/* Rotated container for content to stay straight */}
      <div className="absolute inset-0 -rotate-45 flex items-center justify-center p-2">
        {/* Editable label with double-click */}
        <div
          className="text-sm font-medium text-center"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            // Update the node data when the label is edited
            const nodeElement = e.target.closest('.react-flow__node');
            if (nodeElement) {
              const nodeId = nodeElement.getAttribute('data-id');
              // The change will be handled by React Flow's node data update
            }
          }}
        >
          {data.label}
        </div>
      </div>
      {/* Connection handles */}
      <Handle type="target" position={Position.Top} className="!bg-primary/80 -rotate-45" />
      <Handle type="source" position={Position.Bottom} className="!bg-primary/80 -rotate-45" />
      <Handle type="source" position={Position.Left} className="!bg-primary/80 -rotate-45" />
      <Handle type="source" position={Position.Right} className="!bg-primary/80 -rotate-45" />
    </div>
  );
};
