export interface Bill {
  BillID: string;
  Category: string;
  Year: number;
  BillNumber: string;
  UUID: string;
  CustomerID: string;
  CustomerName: string;
  UnpaidBalance: number;
  DueDate: Date;
  Aging: number;
  assigned_user_name: string | null;
  has_notes: boolean;
}
