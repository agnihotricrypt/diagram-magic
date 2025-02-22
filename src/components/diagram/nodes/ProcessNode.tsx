
import { Handle, Position } from "@xyflow/react";

type NodeData = {
  label: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
    width?: number;
    height?: number;
    rotation?: number;
  };
};

// Rectangle node for process steps
export const ProcessNode = ({ data, selected }: { data: NodeData; selected?: boolean }) => {
  const style = {
    backgroundColor: data.style?.backgroundColor || 'transparent',
    color: data.style?.color || '#000000',
    borderColor: data.style?.borderColor || '#000000',
    width: data.style?.width || 200,
    height: data.style?.height || 100,
  };

  return (
    <div 
      className="bg-background/80 border-2 border-opacity-40 shadow-lg rounded-md"
      style={style}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary/80" />
      <div className="p-3 w-full h-full flex items-center justify-center">
        <div
          className="text-sm font-medium w-full text-center outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            const nodeElement = e.target.closest('.react-flow__node');
            if (nodeElement) {
              const nodeId = nodeElement.getAttribute('data-id');
              // The text update will be handled by React Flow's data update
            }
          }}
        >
          {data.label}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary/80" />
      
      {/* Resize handles when selected */}
      {selected && (
        <>
          <div className="absolute -right-1 top-1/2 w-2 h-2 bg-primary cursor-ew-resize -translate-y-1/2" />
          <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-primary cursor-ns-resize -translate-x-1/2" />
          <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-primary cursor-nwse-resize" />
        </>
      )}
    </div>
  );
};
