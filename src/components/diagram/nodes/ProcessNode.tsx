
import { Handle, Position } from "@xyflow/react";

// Rectangle node for process steps
export const ProcessNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="w-[200px] bg-background/80 border border-opacity-40 shadow-lg rounded-md">
      <Handle type="target" position={Position.Top} className="!bg-primary/80" />
      <div className="p-3">
        <div
          className="text-sm font-medium"
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
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary/80" />
    </div>
  );
};
