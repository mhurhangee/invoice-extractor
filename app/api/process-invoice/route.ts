import { NextRequest, NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import pdfParse from 'pdf-parse'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    const results = await Promise.all(files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer())
      const data = await pdfParse(buffer)
      const fileContent = data.text

      console.log('Parsed invoice content:', fileContent)

      const { object } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          invoice: z.object({
            client: z.string(),
            amountPaid: z.number(),
            currency: z.string().describe('ISO 4217 currency code, e.g. USD, EUR and GBP'),
            invoiceNumber: z.string(),
            date: z.string().describe('Date in DD-MM-YYYY format'),
          }),
        }),
        prompt: `Extract the following information from this invoice: ${fileContent}`,
      })

      return object.invoice
    }))

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error processing invoices:', error)
    return NextResponse.json({ error: 'Error processing invoices' }, { status: 500 })
  }
}