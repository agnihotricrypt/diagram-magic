
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

// Node types for the General section
const GENERAL_NODES = [
  { type: "process", label: "Process" },
  { type: "diamond", label: "Decision" },
  { type: "circle", label: "Start/End" },
  { type: "database", label: "Database" },
];

export const DiagramSidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col gap-2 p-2">
              {GENERAL_NODES.map((node) => (
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
