'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster, toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Invoice = {
  client: string
  amountPaid: number
  currency: string
  invoiceNumber: string
  date: string
}

export default function InvoiceExtractor() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsLoading(true)

    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append('files', file)
    })

    try {
      const response = await fetch('/api/process-invoice', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process invoices')
      }

      const extractedData: Invoice[] = await response.json()

      setInvoices((prev) => [...prev, ...extractedData])
      setIsModalOpen(false)
      toast.success('Invoices Added', {
        description: `${extractedData.length} invoice(s) have been successfully processed and added to the table.`,
      })
    } catch (error) {
      console.error('Error processing invoices:', error)
      toast.error('Error', {
        description: 'There was an error processing the invoices. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Toaster richColors />
      <h1 className="text-3xl font-bold mb-8 text-center">Invoice Extractor</h1>
      <p className="text-center text-gray-600 mb-6">
        Upload readable PDF invoices to automatically extract relevant information using AI. The extracted data will be displayed in the table below.
      </p>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Table>
          <TableCaption>A list of your invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Amount Paid</TableHead>
              <TableHead>Invoice Number</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency }).format(invoice.amountPaid)}
                </TableCell>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 flex justify-center">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>Add Invoices</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Invoices</DialogTitle>
              </DialogHeader>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="invoice">Upload PDF Invoices</Label>
                <Input id="invoice" type="file" accept=".pdf" multiple onChange={handleFileUpload} disabled={isLoading} />
              </div>
              {isLoading && <p className="text-sm text-gray-500">Processing invoices...</p>}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}