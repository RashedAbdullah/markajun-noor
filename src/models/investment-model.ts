import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    investee: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    agreement: {
      type: String,
      default: null,
    },
    contact: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    instalments: {
      type: Number,
      required: true,
    },
    instalmentHistory: [
      {
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    loanStartDate: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    chargedProfit: {
      type: Number,
      required: true,
    },
    paidProfit: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

investmentSchema.virtual("totalPaid").get(function () {
  return this.instalmentHistory.reduce(
    (sum, installment) => sum + installment.amount,
    0
  );
});

investmentSchema.virtual("remainingAmount").get(function () {
  const totalPaid = this.instalmentHistory.reduce(
    (sum, i) => sum + i.amount,
    0
  );
  return this.amount - totalPaid;
});

investmentSchema.virtual("totalDue").get(function () {
  return this.amount + this.chargedProfit;
});

investmentSchema.virtual("profitRemaining").get(function () {
  return this.chargedProfit - this.paidProfit;
});

investmentSchema.index({ status: 1 });

export const investmentModel =
  mongoose.models.Investment || mongoose.model("Investment", investmentSchema);
