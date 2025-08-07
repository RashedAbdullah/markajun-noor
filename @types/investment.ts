import mongoose from "mongoose";

export interface IInstalment {
  amount: number;
  date: Date;
}

export interface IInvestment {
  _id?: string | mongoose.Schema.Types.ObjectId;
  _v: number;
  investee: string;
  reference: string;
  agreement?: string | null;
  contact?: string;
  amount: number;
  instalments: number;
  instalmentHistory: IInstalment[];
  loanStartDate: string;
  dueDate: string;
  chargedProfit: number;
  paidProfit: number;
  status: "Active" | "Closed";

  // Optional timestamps
  createdAt?: Date;
  updatedAt?: Date;

  // Virtuals (computed values)
  totalPaid: number;
  remainingAmount: number;
  totalDue: number;
  profitRemaining: number;
}
