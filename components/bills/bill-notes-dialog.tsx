import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bill } from "@/types/bill";

interface BillNotesDialogProps {
  bill: Bill;
}

export function BillNotesDialog({ bill }: BillNotesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={bill.has_notes ? "default" : "outline"}
          className={bill.has_notes ? "bg-green-600 hover:bg-green-700 text-white" : ""}
        >
          View/Add Notes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Collection Notes for BillId #{bill.BillID} (Customer
            ID: {bill.CustomerID})
          </DialogTitle>
        </DialogHeader>
        <div className="text-sm text-red-600">
          These notes are only for this debt collection system; they
          won’t be written to Munis.
        </div>
        {/* Notes list placeholder */}
        <div className="border rounded-md p-4 h-48 overflow-y-auto">
          Notes List Placeholder
        </div>
        <hr />
        <h3 className="text-lg font-semibold">Add New Note</h3>
        {/* Add note form placeholder */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="activity_type" className="text-right">
              Activity Type
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select an activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Call">Call</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Letter">Letter</SelectItem>
                <SelectItem value="Payment">Payment</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea id="notes" className="col-span-3" />
          </div>
        </div>
        <Button type="submit">Add Note</Button>
        <hr />
        <div className="customer-contact-section">
          <h3 className="text-lg font-semibold">Customer Contact</h3>
          <div id="customerContact">Contact Info Placeholder</div>
        </div>
        <hr />
        <div className="sp-conditions-section">
          <h3 className="text-lg font-semibold">Special Conditions in Munis</h3>
          <div id="spConditions">Special Conditions Placeholder</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
