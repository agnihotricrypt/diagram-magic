
import { useCallback } from "react";

// Node types available in the toolbar
const NODE_TYPES = [
  { type: "process", label: "Process" },
  { type: "diamond", label: "Decision" },
  { type: "circle", label: "Start/End" },
  { type: "database", label: "Database" },
];

export const DiagramToolbar = () => {
  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }, []);

  return (
    <div className="flex gap-2">
      {NODE_TYPES.map((node) => (
        <div
          key={node.type}
          className="border rounded px-4 py-2 cursor-move bg-card hover:bg-accent transition-colors"
          onDragStart={(event) => onDragStart(event, node.type)}
          draggable
        >
          {node.label}
        </div>
      ))}
    </div>
  );
};
