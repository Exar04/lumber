// import { Button } from "@/components/ui/button";
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
// import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";
// import { useParams } from "react-router";

// export function QueryPage() {
//   const { queryTitle } = useParams<{ queryTitle: string }>();
//   const [query, setQuery] = useState<string>("");

//   return (
//     <div className="h-full w-full bg-black text-white flex flex-col">
//       <ResizablePanelGroup direction="vertical" className="flex-1 flex w-full h-full overflow-hidden">
//         <ResizablePanel defaultSize={20} minSize={10}>
//           <div className="h-full w-full flex flex-col">
//             <div className="p-2 mx-2 border rounded-full flex justify-between">
//                 <div className="font-semibold bg-white text-black p-1 px-2 rounded-full">{queryTitle}</div>
//                 <div>
//                     <Button type="button" variant="secondary" className=" rounded-full">submit</Button>
//                 </div>
//             </div>
//             <div className="flex-1 p-2">
//               <Textarea
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="w-full h-full resize-none bg-zinc-900 border-zinc-700 text-white font-mono"
//                 placeholder="Write your query here..."
//               />
//             </div>
//           </div>
//         </ResizablePanel>

//         <ResizableHandle className="w-2 bg-black border-t border-zinc-700 rounded-lg transition-colors" />

//         <ResizablePanel defaultSize={80} minSize={0}>
//           <div className="p-2">Output :</div>
//         </ResizablePanel>
//       </ResizablePanelGroup>
//     </div>
//   );
// }

import { useState } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { serviceApi } from "@/lib/api";

export function QueryPage() {
  const { queryTitle } = useParams<{ queryTitle: string }>();
  const [query, setQuery] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const { data } = await serviceApi.post("/query/get", {
        title: queryTitle,
        query,
      });
      setOutput(JSON.stringify(data, null, 2)); // pretty print JSON
    } catch (err: any) {
      setOutput(`❌ Failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="h-full w-full bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="vertical"
        className="flex-1 flex w-full h-full overflow-hidden"
      >
        <ResizablePanel defaultSize={20} minSize={10}>
          <div className="h-full w-full flex flex-col">
            {/* header row */}
            <div className="p-1 mx-1 border border-zinc-400 rounded-full flex justify-between items-center">
              <div className="font-semibold bg-white text-black p-1 px-2 rounded-full">
                {queryTitle}
              </div>
              <Button
                type="button"
                variant="secondary"
                className="rounded-full"
                onClick={handleSubmit}
              >
                Run
              </Button>
            </div>

            {/* textarea editor */}
            <div className="flex-1 p-2">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-full resize-none bg-zinc-900 border-zinc-700 text-white font-mono"
                placeholder="Write your query here..."
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black border-t border-zinc-700 rounded-lg transition-colors" />

        <ResizablePanel defaultSize={80} minSize={0}>
          <div className="p-2 font-mono whitespace-pre-wrap overflow-auto">
            {output || "Output will appear here..."}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
