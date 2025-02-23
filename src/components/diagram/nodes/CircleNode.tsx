
import { Handle, Position } from "@xyflow/react";

type NodeData = {
  label: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
  };
};

// Circular node for start/end points
export const CircleNode = ({ data }: { data: NodeData }) => {
  const style = {
    backgroundColor: data.style?.backgroundColor || 'transparent',
    color: data.style?.color || '#000000',
    borderColor: data.style?.borderColor || '#000000',
  };

  return (
    <div 
      className="w-[100px] h-[100px] rounded-full bg-background/80 border-2 border-opacity-40 shadow-lg flex items-center justify-center"
      style={style}
    >
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
