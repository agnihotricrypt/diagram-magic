
import { Handle, Position } from "@xyflow/react";

// Circular node for start/end points
export const CircleNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="w-[100px] h-[100px] rounded-full bg-background border shadow-lg flex items-center justify-center">
      <div className="text-sm font-medium text-center">{data.label}</div>
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
};
