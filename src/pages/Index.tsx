
import { DiagramEditor } from "@/components/diagram/DiagramEditor";
import { DiagramSidebar } from "@/components/diagram/DiagramSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="w-full h-screen bg-background flex">
        <DiagramSidebar />
        <div className="flex-1">
          <DiagramEditor />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
