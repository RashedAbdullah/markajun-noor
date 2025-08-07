import CommonHeader from "@/components/common/common-header";
import HeroSection from "@/components/common/hero-section";
import Members from "@/components/members/members";
import React from "react";
import mosque from "@/assets/mosque.jpg";

const MembersPage = () => {
  return (
    <div>
      <HeroSection
        badge="যাদের মাধ্যমে আমাদের পথচলা"
        description="সংগঠনের নীতিমালা সবার জন্য সবসময় ভালোভাবে লক্ষ্য রাখা অত্যান্ত গুরুত্বপূর্ণ। নতুনভাবে সংগঠনের সাথে সংযুক্ত হতে নিম্নোক্ত সকল নিয়মাবলী সম্পূর্ণরূপে মেনে নেওয়ার শর্তেই কেবল জয়েন করতে পারবে।"
        title="সদস্যবৃন্দ"
        image={mosque}
      />
      <CommonHeader
        title="সকল সদস্য"
        description="  সকল সদস্যবৃন্দ ও যাদের মাধ্যমে আমাদের পথচলা। সকল সদস্যবৃন্দ ও যাদের
            মাধ্যমে আমাদের পথচলা। সকল সদস্যবৃন্দ ও যাদের মাধ্যমে আমাদের পথচলা।
            সকল সদস্যবৃন্দ ও যাদের মাধ্যমে আমাদের পথচলা। সকল সদস্যবৃন্দ ও যাদের
            মাধ্যমে আমাদের পথচলা।"
      />
      <Members />
    </div>
  );
};

export default MembersPage;
