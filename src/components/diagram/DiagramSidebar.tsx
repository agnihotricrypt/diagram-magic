
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

// Node types for the General section
const GENERAL_NODES = [
  { 
    type: "process", 
    label: "", // Empty label since we're using shapes
    shape: <div className="w-12 h-6 border-2 rounded" /> 
  },
  { 
    type: "diamond", 
    label: "",
    shape: <div className="w-6 h-6 border-2 rotate-45" />
  },
  { 
    type: "circle", 
    label: "",
    shape: <div className="w-6 h-6 border-2 rounded-full" />
  },
  { 
    type: "database", 
    label: "",
    shape: (
      <div className="w-8 h-8 border-2 rounded-md overflow-hidden flex flex-col">
        <div className="h-2 border-b-2 bg-muted/20" />
        <div className="flex-1" />
      </div>
    )
  },
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
            <div className="flex flex-col gap-4 p-4">
              {GENERAL_NODES.map((node) => (
                <div
                  key={node.type}
                  className="cursor-move hover:bg-accent/10 transition-colors p-2"
                  onDragStart={(event) => onDragStart(event, node.type)}
                  draggable
                >
                  {node.shape}
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
