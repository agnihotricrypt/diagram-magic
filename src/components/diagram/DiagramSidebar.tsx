
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
    shape: <div className="w-[200px] h-[100px] border-2 rounded scale-[0.3] origin-top-left transform" /> 
  },
  { 
    type: "diamond", 
    label: "",
    shape: <div className="w-[150px] h-[150px] border-2 rotate-45 scale-[0.3] origin-top-left transform" />
  },
  { 
    type: "circle", 
    label: "",
    shape: <div className="w-[100px] h-[100px] border-2 rounded-full scale-[0.3] origin-top-left transform" />
  },
  { 
    type: "database", 
    label: "",
    shape: (
      <div className="w-[150px] h-[100px] border-2 rounded-md overflow-hidden flex flex-col scale-[0.3] origin-top-left transform">
        <div className="h-[30px] border-b-2 bg-muted/20" />
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
