
import { Handle, Position } from "@xyflow/react";

// Database symbol node
export const DatabaseNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="w-[150px] min-h-[100px] bg-background/80 border border-opacity-40 shadow-lg flex flex-col rounded-md overflow-hidden">
      {/* Database top cylinder */}
      <div className="h-[30px] border-b relative bg-muted/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[60%] h-[1px] bg-border opacity-40" />
        </div>
        <Handle type="target" position={Position.Top} className="!bg-primary/80" />
      </div>
      {/* Database content */}
      <div className="p-3 flex-1 flex items-center justify-center">
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
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary/80" />
    </div>
  );
};
