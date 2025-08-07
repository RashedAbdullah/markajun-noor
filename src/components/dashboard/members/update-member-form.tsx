"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "../../../../@types/user";
import { memberService } from "@/services";

// Zod schema based on your mongoose model
const memberSchema = z.object({
  memberId: z.string().min(1, "সদস্য নির্বাচন করুন"),
  name: z.string().min(3, "নাম অবশ্যই ৩ অক্ষরের বেশি হতে হবে"),
  father: z.string().optional(),
  nationalId: z
    .string()
    .regex(/^\d{10,17}$/, "সঠিক জাতীয় আইডি নম্বর দিন")
    .optional(),
  mobile: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "সঠিক মোবাইল নম্বর দিন")
    .optional(),
  position: z.string().min(2, "পদবী অবশ্যই ২ অক্ষরের বেশি হতে হবে"),
  shares: z.number().min(1, "শেয়ার সংখ্যা ১ এর বেশি হতে হবে"),
  email: z.string().email("সঠিক ইমেইল দিন"),
  password: z.string().min(6, "পাসওয়ার্ড দিতে হবে"),
});

type MemberFormValues = z.infer<typeof memberSchema>;

const UpdateMemberForm = ({ members }: { members: IUser[] }) => {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      memberId: "",
      name: "",
      email: "",
      password: "",
      father: "",
      nationalId: "",
      mobile: "",
      position: "",
      shares: 0,
    },
  });

  const selectedMemberId = form.watch("memberId");

  // When member is selected, populate form with their data
  useEffect(() => {
    if (selectedMemberId) {
      const member = members.find((m) => m._id.toString() === selectedMemberId);

      const getSelectedUserData = async () => {
        if (member) {
          const { data: selectedMember } = await memberService.getMemberById(
            member._id.toString()
          );

          form.reset({
            ...selectedMember,
            memberId: member._id.toString(),
            shares: member.shares || 0,
          });
        }
      };
      getSelectedUserData();
    }
  }, [selectedMemberId, form, members]);

  const onSubmit = async (data: MemberFormValues) => {
    try {
      await memberService.updateMember(selectedMemberId, data);
      // Show success message
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>সদস্য আপডেট করুন</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="memberId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>সদস্য নির্বাচন করুন</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="সদস্য নির্বাচন করুন" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {members.map((member) => (
                          <SelectItem
                            key={member._id.toString()}
                            value={member._id.toString()}
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>
                                  {member.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>
                                {member.name} -{" "}
                                {member.nationalId || member.mobile}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedMemberId && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>নাম</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="নাম" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="father"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>পিতার নাম</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="পিতার নাম" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nationalId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>জাতীয় আইডি</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="জাতীয় আইডি" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>মোবাইল</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="মোবাইল" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>পদবী</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="পদবী" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shares"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>শেয়ার সংখ্যা</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                              placeholder="শেয়ার সংখ্যা"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ইমেইল</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="ইমেইল" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>পাসওয়ার্ড</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="ইমেইল" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg"
                    >
                      আপডেট করুন
                    </Button>
                  </div>
                </>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateMemberForm;
