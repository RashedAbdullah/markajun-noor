import { organizationInfo } from "@/data/organization-info";
import { summaryService } from "@/services";
import { getEnToBn } from "@/utils/en-to-bn";
import { formatPrice } from "@/utils/formate-price";

const SummarySection = async () => {
  try {
    const summaryData = await summaryService.getSummary();

    const summary = [
      {
        title: "ইনভেস্ট করা হয়েছে",
        value: formatPrice(summaryData.totalInvestment),
      },
      {
        title: "ইনভেস্ট থেকে জমা",
        value: formatPrice(summaryData.paymentFromInvestment),
      },
      {
        title: "শেয়ার বাবদ টোটাল জমা",
        value: formatPrice(summaryData.paymentsFromShares),
      },
      {
        title: "মুনাফা বাবদ টোটাল জমা",
        value: formatPrice(summaryData.profitDeposits),
      },
      {
        title: "মোট সদস্য-সংখ্যা",
        value: getEnToBn(summaryData.totalMembers),
      },
      {
        title: "শেয়ার সংখ্যা",
        value: getEnToBn(summaryData.totalShares),
      },
      {
        title: "ব্যাংক প্রফিট",
        value: formatPrice(summaryData.totalBankProfit),
      },
      {
        title: "ব্যাংক ফি ও অনান্য বাবাদ খরচ",
        value: formatPrice(summaryData.totalExpense),
      },
    ];
    return (
      <div className="bg-brand py-12 text-white">
        <div className="container lg:grid grid-cols-12 gap-4 space-y-20 lg:space-y-0">
          <div className="col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-white rounded-full" />
                <p className="text-white text-xs lg:text-base">
                  {organizationInfo.summary.badge}
                </p>
              </div>
              <h3 className="text-2xl lg:text-5xl font-medium text-white mt-2">
                {organizationInfo.summary.title}
              </h3>
            </div>

            <div>
              <p className="text-base text-white font-light text-justify">
                {organizationInfo.summary.description}
              </p>
            </div>
          </div>
          <div className="col-span-2" />
          <div className="col-span-5">
            <div className="pb-10 border-b border-card-and-Heiglighter">
              <h2 className={`text-3xl lg:text-5xl`}>
                {formatPrice(summaryData.currentDeposit)}
              </h2>
              <p className="text-lg">বর্তমান জমা</p>
            </div>

            {/*  */}
            <ul className="grid grid-cols-2 flex-nowrap gap-y-2">
              {summary.map((sum, index) => (
                <li
                  key={index}
                  className={`py-5 border-b border-card-and-Heiglighter ${
                    index % 2 === 0 ? "text-start" : "text-end"
                  }`}
                >
                  <div>
                    <h3 className={`text-3xl lg:text-5xl`}>{sum.value}</h3>
                    <p className="text-lg mt-2">{sum.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching summary:", error);
    return (
      <div className="container flex justify-center items-center bg-red-100 text-red-800 p-4 rounded">
        <p>সারাংশ তথ্য লোড করতে সমস্যা হয়েছে।</p>
      </div>
    );
  }
};

export default SummarySection;
