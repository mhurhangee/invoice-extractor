# Invoice Extractor

Invoice Extractor is an open-source web application that uses AI to extract relevant information from PDF invoices. It provides a simple interface for uploading invoices and displays the extracted data in a table format.

## Features

- Upload multiple PDF invoices
- Extract key information such as client name, amount paid, currency, invoice number, and date
- Display extracted information in a clean, easy-to-read table

## Technologies Used

- Next.js
- React
- TypeScript
- Shadcn UI components
- AI-SDK with OpenAI integration
- PDF parsing

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/mhurhangee/invoice-extractor.git
```

2. Install dependencies:

```bash
cd invoice-extractor
npm install
```

3. Set up your environment variables:
Create a `.env.local` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Click the "Add Invoices" button.
2. Select one or more PDF invoices from your computer.
3. Wait for the AI to process and extract information from the invoices.
4. View the extracted information in the table on the main page.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).