"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Bill } from "@/types/bill";
import { BillNotesDialog } from "./bill-notes-dialog";

interface BillsTableProps {
  bills: Bill[];
}

export function BillsTable({ bills }: BillsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox id="select-all-bills" />
          </TableHead>
          <TableHead>Bill ID</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Bill Number</TableHead>
          <TableHead>ItemIdentifier</TableHead>
          <TableHead>Customer ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Unpaid Balance</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Aging</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bills.map((bill) => (
          <TableRow key={bill.BillID}>
            <TableCell>
              <Checkbox
                className="bill-checkbox"
                data-bill-id={bill.BillID}
              />
            </TableCell>
            <TableCell>{bill.BillID}</TableCell>
            <TableCell>{bill.Category}</TableCell>
            <TableCell>{bill.Year}</TableCell>
            <TableCell>{bill.BillNumber}</TableCell>
            <TableCell>{bill.UUID}</TableCell>
            <TableCell>{bill.CustomerID}</TableCell>
            <TableCell>{bill.CustomerName}</TableCell>
            <TableCell>
              {bill.UnpaidBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell>{bill.DueDate.toISOString().split("T")[0]}</TableCell>
            <TableCell>{bill.Aging}</TableCell>
            <TableCell>{bill.assigned_user_name || "Unassigned"}</TableCell>
            <TableCell>
              <BillNotesDialog bill={bill} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
