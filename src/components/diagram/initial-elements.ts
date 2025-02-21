
import { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { label: "Start" },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    type: "custom",
    data: { label: "Process" },
    position: { x: 250, y: 150 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
];
