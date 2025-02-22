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
    label: "", 
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
  {
    type: "ellipse",
    label: "",
    shape: <div className="w-12 h-6 border-2 rounded-full" />
  },
  {
    type: "text",
    label: "",
    shape: <div className="w-12 h-6 border-2 border-dashed flex items-center justify-center text-xs">Abc</div>
  },
  {
    type: "square",
    label: "",
    shape: <div className="w-6 h-6 border-2" />
  },
  {
    type: "cylinder",
    label: "",
    shape: (
      <div className="w-8 h-8 border-2 flex flex-col rounded-t-full rounded-b-full">
        <div className="h-2 border-b-2 rounded-t-full bg-muted/20" />
        <div className="flex-1" />
      </div>
    )
  },
  {
    type: "cloud",
    label: "",
    shape: (
      <div className="w-10 h-6 border-2 rounded-[100px]" />
    )
  },
  {
    type: "parallelogram",
    label: "",
    shape: (
      <div className="w-10 h-6 border-2 [clip-path:polygon(20%_0%,_100%_0%,_80%_100%,_0%_100%)]" />
    )
  },
  {
    type: "hexagon",
    label: "",
    shape: (
      <div className="w-10 h-6 border-2 [clip-path:polygon(25%_0%,_75%_0%,_100%_50%,_75%_100%,_25%_100%,_0%_50%)]" />
    )
  },
  {
    type: "triangle",
    label: "",
    shape: (
      <div className="w-8 h-7 border-2 [clip-path:polygon(50%_0%,_100%_100%,_0%_100%)]" />
    )
  },
  {
    type: "note",
    label: "",
    shape: (
      <div className="w-8 h-8 border-2 [clip-path:polygon(0%_0%,_80%_0%,_100%_20%,_100%_100%,_0%_100%)]">
        <div className="absolute top-0 right-0 w-2 h-2 border-l-2 border-b-2" />
      </div>
    )
  },
  {
    type: "callout",
    label: "",
    shape: (
      <div className="relative w-10 h-6">
        <div className="absolute inset-0 border-2 rounded" />
        <div className="absolute -bottom-2 left-2 w-2 h-2 border-l-2 border-b-2 rotate-45" />
      </div>
    )
  },
  {
    type: "actor",
    label: "",
    shape: (
      <div className="w-6 h-8 flex flex-col items-center">
        <div className="w-3 h-3 border-2 rounded-full" />
        <div className="w-0.5 h-3 bg-border" />
        <div className="w-4 h-0.5 bg-border" />
        <div className="w-0.5 h-2 bg-border" />
        <div className="w-3 h-0.5 bg-border rotate-45 -translate-x-0.5" />
        <div className="w-3 h-0.5 bg-border -rotate-45 translate-x-0.5 -translate-y-0.5" />
      </div>
    )
  },
  {
    type: "dashed",
    label: "",
    shape: <div className="w-12 h-0 border-t-2 border-dashed" />
  },
  {
    type: "connector",
    label: "",
    shape: (
      <div className="w-12 h-0 border-t-2 relative">
        <div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 rotate-45" />
      </div>
    )
  },
];

// Color palette options
const COLOR_PALETTE = [
  { bg: "#FFFFFF", border: "#000000", label: "Black & White" },
  { bg: "#F2FCE2", border: "#4CAF50", label: "Soft Green" },
  { bg: "#FEF7CD", border: "#FFC107", label: "Soft Yellow" },
  { bg: "#FEC6A1", border: "#FF9800", label: "Soft Orange" },
  { bg: "#E5DEFF", border: "#9b87f5", label: "Soft Purple" },
  { bg: "#FFDEE2", border: "#F44336", label: "Soft Pink" },
  { bg: "#D3E4FD", border: "#2196F3", label: "Soft Blue" },
  { bg: "#222222", border: "#FFFFFF", label: "Dark Mode" },
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
            <div className="flex flex-wrap gap-4 p-4">
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
        
        <SidebarGroup>
          <SidebarGroupLabel>Color Themes</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-2 gap-2 p-4">
              {COLOR_PALETTE.map((color, index) => (
                <button
                  key={index}
                  className="p-2 rounded border hover:bg-accent/10 transition-colors flex flex-col items-center gap-2"
                  onClick={() => {
                    // We'll implement color change in DiagramEditor
                    const event = new CustomEvent('changeNodeColor', {
                      detail: { backgroundColor: color.bg, borderColor: color.border }
                    });
                    window.dispatchEvent(event);
                  }}
                >
                  <div 
                    className="w-full h-8 rounded border-2"
                    style={{ 
                      backgroundColor: color.bg,
                      borderColor: color.border 
                    }}
                  />
                  <span className="text-xs">{color.label}</span>
                </button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
