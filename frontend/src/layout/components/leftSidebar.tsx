import { useState } from "react"
import { TableList } from "@/components/tableList";
import { QueryList } from "@/components/queryList";

export function LeftSidebar() {
    const [activeTab, setActiveTab] = useState("tables")
    const topbarList = [
        {
            id: 1,
            name: "Tables",
            tab: "tables",
        },
        {
            id: 2,
            name: "Schema",
            tab: "schema",
        },
        {
            id: 3,
            name: "Queries",
            tab: "queries",
        },
    ]
    return (
        <div className="border-r h-full border-r-zinc-700">
                <div className="p-1">
            <div className=" border flex justify-between p-1 rounded-full border-zinc-400">
                    {topbarList.map((item) => (
                        <div onClick={() => { setActiveTab(item.tab) }} className={`${activeTab == item.tab ? "bg-zinc-700" : "hover:bg-zinc-800"} cursor-pointer p-1 px-3 rounded-full`} key={item.id}>
                            <div>{item.name}</div>
                        </div>
                    ))}
            </div>
                </div>
                <div className="p-2 h-full">
                    {activeTab == "tables" && <TableList />}
                    {activeTab == "history" && <div>History</div>}
                    {activeTab == "queries" && <QueryList />}
                </div>
        </div>
    )
}