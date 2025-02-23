
import { Handle, Position } from "@xyflow/react";

type NodeData = {
  label: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
    width?: number;
    height?: number;
  };
};

export const CircleNode = ({ data, selected }: { data: NodeData; selected?: boolean }) => {
  const style = {
    backgroundColor: data.style?.backgroundColor || 'transparent',
    color: data.style?.color || '#000000',
    borderColor: data.style?.borderColor || '#000000',
    width: data.style?.width || 100,
    height: data.style?.height || 100,
  };

  return (
    <div 
      className="rounded-full bg-background/80 border-2 border-opacity-40 shadow-lg flex items-center justify-center"
      style={{
        ...style,
        resize: selected ? 'both' : 'none',
        overflow: 'hidden',
      }}
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
      
      {/* Resize handles */}
      {selected && (
        <>
          <div className="absolute -right-1 top-1/2 w-3 h-3 bg-primary cursor-ew-resize -translate-y-1/2" />
          <div className="absolute left-1/2 -bottom-1 w-3 h-3 bg-primary cursor-ns-resize -translate-x-1/2" />
          <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-primary cursor-nwse-resize" />
        </>
      )}
    </div>
  );
};
