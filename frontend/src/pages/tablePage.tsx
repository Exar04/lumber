import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { serviceApi } from "@/lib/api";

export function TablePage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [dataKeys, setDataKeys] = useState<string[]>([]);
  const { tableName } = useParams<{ tableName: string }>();

  useEffect(() => {
    serviceApi.get(`tables/${tableName}`).then((res) => {
      const response = Array.isArray(res.data) ? res.data : [res.data];
      setData(response);
      const keys = response.length > 0 ? Object.keys(response[0]) : [];
      setDataKeys(keys);
    });
  }, [tableName]);

  function deleteItem(id: any) {
    serviceApi.delete(`tables/${tableName}/${id}`)
      .then(() => {
        setData(prev => prev.filter(row => row.id !== id))
      })
      .catch(err => {
        console.error(err);
        alert("Could not delete record");
      });
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-zinc-700 hover:bg-zinc-900">
            {dataKeys.map((key) => (
              <TableHead key={key} className="text-white">
                {key}
              </TableHead>
            ))}
            {dataKeys.length > 0 ?<TableHead className="text-white">Actions</TableHead>: ""}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className=" hover:bg-zinc-900 border-b border-zinc-700">
              {dataKeys.map((key) => (
                <TableCell key={key}>{String(row[key])}</TableCell>
              ))}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded hover:bg-zinc-800">
                      <MoreHorizontal size={18} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-zinc-900 text-white border border-zinc-700">
                    <DropdownMenuItem onClick={() => alert(`Edit row ${rowIndex}`)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {deleteItem(row.id)}}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
