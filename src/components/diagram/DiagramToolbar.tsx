
import { useCallback } from "react";

export const DiagramToolbar = () => {
  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }, []);

  return (
    <div className="flex gap-2">
      <div
        className="border rounded px-4 py-2 cursor-move bg-card hover:bg-accent transition-colors"
        onDragStart={(event) => onDragStart(event, "custom")}
        draggable
      >
        Add Node
      </div>
    </div>
  );
};
