
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

export const DatabaseNode = ({ data, selected }: { data: NodeData; selected?: boolean }) => {
  const style = {
    backgroundColor: data.style?.backgroundColor || 'transparent',
    color: data.style?.color || '#000000',
    borderColor: data.style?.borderColor || '#000000',
    width: data.style?.width || 150,
    height: data.style?.height || 100,
  };

  return (
    <div 
      className="min-h-[100px] bg-background/80 border-2 border-opacity-40 shadow-lg flex flex-col rounded-md overflow-hidden"
      style={{
        ...style,
        resize: selected ? 'both' : 'none',
        overflow: 'hidden',
      }}
    >
      <div 
        className="h-[30px] border-b relative bg-muted/20"
        style={{ borderColor: style.borderColor }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-[60%] h-[1px] bg-border opacity-40"
            style={{ backgroundColor: style.borderColor }} 
          />
        </div>
        <Handle type="target" position={Position.Top} className="!bg-primary/80" />
      </div>
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
