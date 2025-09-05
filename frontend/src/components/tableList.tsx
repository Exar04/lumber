import { useGlobalData } from "@/context/globalContext";
import { serviceApi } from "@/lib/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export function TableList() {
  const [data, setData] = useState<string[]>([]);
  const { tableName } = useParams<{ tableName: string }>();
  const { setAddingRecord } = useGlobalData()
  useEffect(() => {
    serviceApi.get("tables").then((res) => {
      setData(res.data);
    });
  }, []);

  function deleteTable(tname: string) {
  serviceApi
    .delete(`tables/${tname}`)
    .then(() => {
      setData((prev) => prev.filter((item) => item !== tname));
    })
    .catch((err) => {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Some Error Occured"
      );
    });
}

  return (
    <div className="flex flex-col gap-1">
      {data.map((item, id) => (
        <div key={id} className={`flex justify-between items-center rounded-lg transition-colors ${item == tableName? "bg-zinc-900":"hover:bg-zinc-800"}  px-2`}>
          {/* Link to table page */}
          <Link
            to={`/table/${item}`}
            className={`flex-1 p-2 ${item === tableName ? "font-bold" : ""}`}
          >
            {item}
          </Link>

          {/* Actions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-md hover:bg-zinc-700 outline-none focus:outline-none focus-visible:ring-0">
                <MoreHorizontal size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 text-white border border-zinc-700">
              <DropdownMenuItem onClick={() => setAddingRecord({open: true, tableName: item})}>
                Add Item
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {deleteTable(item)}}>
                Delete Table
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}