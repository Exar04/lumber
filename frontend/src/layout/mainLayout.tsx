import { Outlet } from "react-router-dom";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable";
import { LeftSidebar } from "./components/leftSidebar";
import { AddRecord } from "@/components/addRecord";
import { AddTable } from "@/components/addTable";
import { useGlobalData } from "@/context/globalContext";

export function MainLayout() {
  const { isAddingRecord, isAddingTable } = useGlobalData()
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden">
       {/* left sidebar  */}
        <ResizablePanel defaultSize={20} minSize={10} maxSize={40}>
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"/>

        {/* Main Content */}
        <ResizablePanel defaultSize={80} >
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"/>

      </ResizablePanelGroup>

      { isAddingRecord ? <AddRecord /> : "" }
      { isAddingTable ? <AddTable /> : "" }

    </div>
  )
}
