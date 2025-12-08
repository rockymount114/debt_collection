import { Bill } from "@/types/bill";
import { promises as fs } from "fs";
import { BillsTable } from "@/components/bills/bills-table";
import { BillsFilters } from "@/components/bills/bills-filters";
import { AssignBillsForm } from "@/components/bills/assign-bills-form";
import { Pagination } from "@/components/bills/pagination";

// Mock data
const mockBills: Bill[] = [
  {
    BillID: "B12345",
    Category: "Taxes",
    Year: 2023,
    BillNumber: "2023-001",
    UUID: "uuid-1",
    CustomerID: "CUST-001",
    CustomerName: "John Doe",
    UnpaidBalance: 1500.0,
    DueDate: new Date("2023-10-15"),
    Aging: 90,
    assigned_user_name: "Jane Smith",
    has_notes: true,
  },
  {
    BillID: "B12346",
    Category: "Utilities",
    Year: 2023,
    BillNumber: "2023-002",
    UUID: "uuid-2",
    CustomerID: "CUST-002",
    CustomerName: "Peter Jones",
    UnpaidBalance: 350.5,
    DueDate: new Date("2023-11-01"),
    Aging: 45,
    assigned_user_name: null,
    has_notes: false,
  },
];

const mockUsers = [
  { id: 1, full_name: "Jane Smith" },
  { id: 2, full_name: "Admin User" },
];

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Debt Collections System</h1>
        {/* Placeholder for nav */}
        <hr className="my-4" />
      </header>

      <BillsFilters />

      <AssignBillsForm />

      {/* Bill summary */}
      <div className="text-sm text-gray-600 mb-4">
        Showing records 1 to {mockBills.length} of {mockBills.length} total matching bills. Total
        filtered: ${" "}
        {mockBills
          .reduce((acc, bill) => acc + bill.UnpaidBalance, 0)
          .toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
      </div>

      <BillsTable bills={mockBills} />

      <Pagination />
    </div>
  );
}
