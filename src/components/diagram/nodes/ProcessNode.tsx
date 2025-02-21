
import { Handle, Position } from "@xyflow/react";

// Rectangle node for process steps
export const ProcessNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="w-[200px] bg-background border shadow-lg rounded-md">
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <div className="p-3">
        <div className="text-sm font-medium">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
};
