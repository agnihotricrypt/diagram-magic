
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

export const ProcessNode = ({ data, selected, type }: { data: NodeData; selected?: boolean; type?: string }) => {
  const style = {
    backgroundColor: data.style?.backgroundColor || 'transparent',
    color: data.style?.color || '#000000',
    borderColor: data.style?.borderColor || '#000000',
    width: data.style?.width || 200,
    height: data.style?.height || 100,
  };

  // Define shape-specific styles
  const getShapeClassName = () => {
    switch (type) {
      case 'ellipse':
        return 'rounded-full';
      case 'actor':
        return 'actor-shape';
      case 'parallelogram':
        return '[clip-path:polygon(20%_0%,_100%_0%,_80%_100%,_0%_100%)]';
      case 'hexagon':
        return '[clip-path:polygon(25%_0%,_75%_0%,_100%_50%,_75%_100%,_25%_100%,_0%_50%)]';
      case 'triangle':
        return '[clip-path:polygon(50%_0%,_100%_100%,_0%_100%)]';
      case 'cloud':
        return 'rounded-[100px]';
      default:
        return 'rounded-md';
    }
  };

  const getShapeContent = () => {
    if (type === 'actor') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 rounded-full mb-2" />
          <div className="w-0.5 h-12 bg-border" />
          <div className="w-12 h-0.5 bg-border -mt-6" />
          <div className="flex mt-2">
            <div className="w-6 h-0.5 bg-border rotate-45" />
            <div className="w-6 h-0.5 bg-border -rotate-45" />
          </div>
        </div>
      );
    }
    return (
      <div
        className="text-sm font-medium w-full text-center outline-none"
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
    );
  };

  return (
    <div 
      className={`bg-background/80 border-2 border-opacity-40 shadow-lg ${getShapeClassName()}`}
      style={{
        ...style,
        resize: selected ? 'both' : 'none',
        overflow: 'hidden',
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary/80" />
      <div className="p-3 w-full h-full flex items-center justify-center">
        {getShapeContent()}
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
