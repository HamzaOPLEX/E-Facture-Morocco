export interface Document {
    id?: number;
    clientName?: string;
    documentDate?: string | Date;
    documentStatus?: string;
}

export interface InvoiceDocument {
    id?: number;
    clientName?: string;
    documentDate?: string | Date;
    documentStatus?: string;
    invoiceAvnace?: number;
    invoiceRest?: number;
    invoiceHT?: number;
    invoiceTTC?: number;
}