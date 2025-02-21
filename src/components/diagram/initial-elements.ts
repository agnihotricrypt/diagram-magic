
import { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "circle",
    data: { label: "Start" },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    type: "process",
    data: { label: "Process Data" },
    position: { x: 250, y: 100 },
  },
  {
    id: "3",
    type: "diamond",
    data: { label: "Valid?" },
    position: { x: 250, y: 250 },
  },
  {
    id: "4",
    type: "database",
    data: { label: "Store Result" },
    position: { x: 250, y: 400 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
  },
];
