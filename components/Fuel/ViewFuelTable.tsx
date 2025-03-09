"use client"

import { useState ,useEffect} from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import { EditRecordDialog } from '@/components/Fuel/edit-record-dialog'
import { DeleteRecordDialog } from '@/components/Fuel/delete-record-dialog'
import { useToast } from '@/components/ui/use-toasts'
import { TFuel } from "@/app/types"


// interface Record {
//   id: number
//   name: string
//   email: string
//   role: string
//   status: string
// }


export function DataTable() {
  const [records, setRecords] = useState<TFuel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingRecord, setEditingRecord] = useState<TFuel | null>(null)
  const [deletingRecord, setDeletingRecord] = useState<TFuel | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchRecords();
    //eslint-disable-next-line
  }, [])

  const fetchRecords = async () => {
    setLoading(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/fuel");

      if (!response.ok) {
        throw new Error("Failed to fetch records")
      }

      // const data = await response.json()
     
     const data=await response.json();
     //return data;
    

      

      //Transform the data to match our Record interface
      const transformedData = data.map((fuel: TFuel) => ({
        id:fuel.id,
        FuelCode:fuel.FuelCode,
        FuelName:fuel.FuelName,
        UnitPrice:fuel.UnitPrice,
        PreOrderLevel:fuel.PreOrderLevel,
      }))

      setRecords(transformedData)
      

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch records. Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (record: TFuel) => {
    setEditingRecord(record)
  }

  const handleDelete = (record: TFuel) => {
    setDeletingRecord(record)
  }

  // //Update Records
  const handleSaveEdit = async (updatedRecord: TFuel) => {
    try {
      // Replace with your actual API endpoint
      console.log(updatedRecord.id)
      const response = await fetch(`/api/fuel/${updatedRecord.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FuelCode:(updatedRecord.FuelCode),
          FuelName:(updatedRecord.FuelName),
          UnitPrice:Number(updatedRecord.UnitPrice),
          PreOrderLevel:Number(updatedRecord.PreOrderLevel)
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update record")
      }

      // Update the local state
      setRecords(records.map((record) => (record.id === updatedRecord.id ? updatedRecord : record)))

      toast({
        title: "Record updated",
        description: `${updatedRecord.FuelCode} has been updated successfully.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update record. Please try again.",
        
      })
      console.log(error)
    } finally {
      setEditingRecord(null)
    }
  }

  // //delete records
  const handleConfirmDelete = async (id: string) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/fuel/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete record")
      }

      // Update the local state
      setRecords(records.filter((record) => record.id !== id))

      toast({
        title: "Record deleted",
        description: "The record has been deleted successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete record. Please try again.",
      })
      console.log(error);
    } finally {
      setDeletingRecord(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading records...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/10 p-4 rounded-md text-destructive">
        <p>Error: {error}</p>
        <Button variant="outline" className="mt-2" onClick={fetchRecords}>
          Try Again
        </Button>
      </div>
    )
  }
  
  return (
    <div>
      <div className="rounded-md border w-full max-w-3xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>ID</TableHead> */}
              <TableHead>Fuel Code</TableHead>
              <TableHead>Fuel Name</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Pre Order Level</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id}>
                  {/* <TableCell>{record.id}</TableCell> */}
                  <TableCell className="font-medium">{record.FuelCode}</TableCell>
                  <TableCell>{record.FuelName}</TableCell>
                  <TableCell>{record.UnitPrice}</TableCell>
                  <TableCell>{record.PreOrderLevel}</TableCell>
                  {/* <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </TableCell> */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" 
                        onClick={() => handleEdit(record)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(record)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingRecord && (
        <EditRecordDialog record={editingRecord} onSave={handleSaveEdit} onCancel={() => setEditingRecord(null)} />
      )}

      {deletingRecord && (
        <DeleteRecordDialog
          record={deletingRecord}
          onConfirm={() => handleConfirmDelete(deletingRecord.id)}
          onCancel={() => setDeletingRecord(null)}
        />
      )} 
    </div>
  )
}

