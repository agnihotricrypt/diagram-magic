
import { Handle, Position } from "@xyflow/react";

// Circular node for start/end points
export const CircleNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="w-[100px] h-[100px] rounded-full bg-background/80 border border-opacity-40 shadow-lg flex items-center justify-center">
      <div
        className="text-sm font-medium text-center"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const nodeElement = e.target.closest('.react-flow__node');
          if (nodeElement) {
            const nodeId = nodeElement.getAttribute('data-id');
          }
        }}
      >
        {data.label}
      </div>
      <Handle type="target" position={Position.Top} className="!bg-primary/80" />
      <Handle type="source" position={Position.Bottom} className="!bg-primary/80" />
    </div>
  );
};
