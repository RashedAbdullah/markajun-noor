import { database_connection } from "@/lib/db";
import { investmentModel } from "@/models/investment-model";
import { getCloudinaryResponse } from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await database_connection();

    const investments = await investmentModel.find({}).lean();
    investments.sort((a, b) => {
      if (a.status === b.status) return 0;
      if (a.status === "Active") return -1;
      if (b.status === "Active") return 1;
      return 0;
    });

    return NextResponse.json({ success: true, data: investments });
  } catch (error) {
    console.log("Failed to fetch investments ", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch investments" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await database_connection();
    const formData = await req.formData();

    const {
      investee,
      reference,
      contact,
      amount,
      instalments,
      loanStartDate,
      dueDate,
      chargedProfit,
      status,
    } = Object.fromEntries(formData.entries());

    // Handle case when no file is uploaded
    let agreementReponse = "";

    const agreement = formData.get("agreement");
    if (
      agreement &&
      typeof agreement === "object" &&
      "arrayBuffer" in agreement
    ) {
      const arrayBuffer = await agreement.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      agreementReponse = (await getCloudinaryResponse(buffer)) ?? "";
    }

    const investment = await investmentModel.create({
      investee,
      reference, // Add this
      loanStartDate,
      dueDate,
      chargedProfit: Number(chargedProfit),
      status,
      contact,
      amount: Number(amount),
      instalments: Number(instalments),
      agreement: agreementReponse,
      installmentHistory: [],
    });

    return NextResponse.json(
      { success: true, data: investment },
      { status: 201 }
    );
  } catch (error) {
    console.log("Failed to create investment ", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create investment",
      },
      { status: 500 }
    );
  }
};
