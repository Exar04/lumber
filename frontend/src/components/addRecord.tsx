import { useGlobalData } from "@/context/globalContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { serviceApi } from "@/lib/api"

type ColumnSchema = {
  column_name: string
  data_type: string
}

export function AddRecord() {
  const { isAddingRecord, setAddingRecord } = useGlobalData()
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const [dataKeys, setDataKeys] = useState<ColumnSchema[]>([])

  useEffect(() => {
    if (!isAddingRecord.tableName) return

    serviceApi.get(`tables/${isAddingRecord.tableName}/schema`).then((res) => {
      if (res.data.length > 0) {
        setDataKeys(res.data)

        // initialize formData with empty values
        const initialData: { [key: string]: string } = {}
        res.data.forEach((col: { column_name: string }) => {
          if (col.column_name !== "id") {
            initialData[col.column_name] = ""
          }
        })
        setFormData(initialData)
      }
    })
  }, [isAddingRecord.tableName])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await serviceApi.post(`tables/${isAddingRecord.tableName}`, formData)
      setAddingRecord({ open: false, tableName: "" })
    } catch (err) {
      console.error(err)
      alert("Could not add record")
    }
  }


  return (
    <Dialog
      open={isAddingRecord.open}
      onOpenChange={(open) =>
        setAddingRecord((prev) => ({ ...prev, open }))
      }
    >
      <DialogContent className="bg-zinc-900/90 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add New Record in '{isAddingRecord.tableName}' table
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the new record.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {dataKeys
            .filter((col) => col.column_name !== "id") // skip id
            .map((col) => (
              <div key={col.column_name} className="space-y-2">
                <Label htmlFor={col.column_name}>
                  {col.column_name} ({col.data_type})
                </Label>
                <Input
                  id={col.column_name}
                  name={col.column_name}
                  value={formData[col.column_name] || ""}
                  onChange={handleChange}
                  className="bg-zinc-800/60 border-zinc-700 text-white"
                />
              </div>
            ))}

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setAddingRecord({ open: false, tableName: "" })}>
              Cancel
            </Button>
            <Button type="submit" variant="ghost">Add</Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}
