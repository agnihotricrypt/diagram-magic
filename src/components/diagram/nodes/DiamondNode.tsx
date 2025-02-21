
import { Handle, Position } from "@xyflow/react";

// Diamond shaped node for decision points
export const DiamondNode = ({ data }: { data: { label: string } }) => {
  return (
    // Using CSS to create diamond shape
    <div className="relative w-[150px] h-[100px] rotate-45 bg-background border shadow-lg">
      {/* Rotated container for content to stay straight */}
      <div className="absolute inset-0 -rotate-45 flex items-center justify-center p-2">
        <div className="text-sm font-medium text-center">{data.label}</div>
      </div>
      {/* Connection handles */}
      <Handle type="target" position={Position.Top} className="!bg-primary -rotate-45" />
      <Handle type="source" position={Position.Bottom} className="!bg-primary -rotate-45" />
      <Handle type="source" position={Position.Left} className="!bg-primary -rotate-45" />
      <Handle type="source" position={Position.Right} className="!bg-primary -rotate-45" />
    </div>
  );
};
