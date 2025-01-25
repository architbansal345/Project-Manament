"use client";
import Header from "@/components/header";
import {
  LeaveApplications,
  RemainingLeave,
} from "@/services/privateAPI/private";
import { CapitalizeFirstLetter, ConvertDateFromISO, DateToDays } from "@/utils/commonfunction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";

export default function LeaveApplication() {
  const router = useRouter();

  const [remainingLeaveType, setRemainingLeave] = useState<
    LeaveType | undefined
  >(undefined);

  const [leaveApplications, setLeaveApplications] = useState<
    LeaveApplications[] | undefined
  >(undefined);

  const remainingLeave = async () => {
    try {
      const data = await RemainingLeave();
      if (data.status === "success") {
        const leaveData = data.leave_balance;
        setRemainingLeave({
          Casual: leaveData.casual,
          Sick: leaveData.sick,
          Paid: leaveData.paid,
        });
      } else {
        console.log("Error from Server");
        return;
      }
    } catch (err) {
      console.error("Fetching Remaining Leave failed:", err);
    }
  };

  const leaveApplication = async () => {
    try {
      const data = await LeaveApplications();
      if (data.status === "success") {
        const leaveData = data.leave_application;
        console.log(data);

        setLeaveApplications(
          leaveData.map((leaveApplication: any) => ({
            Id: leaveApplication.id,
            StartDate: ConvertDateFromISO(leaveApplication.start_date),
            EndDate: ConvertDateFromISO(leaveApplication.end_date),
            LeaveType: CapitalizeFirstLetter(leaveApplication.leave_type),
            Status: leaveApplication.status,
          }))
        );
      } else {
        console.log("Error from Server");
        return;
      }
    } catch (err) {
      console.error("Fetching Remaining Leave failed:", err);
    }
  };
  useEffect(() => {
    remainingLeave();
    leaveApplication();
  }, []);

  const handleLeave = (val: string) => {
    router.push(`/dashboard/leaveApplication/leaveType?leave=${val}`);
  };
  return (
    <div className="h-screen">
      <Header />
      <main className="flex-1 h-[calc(100vh-5rem)] gap-6 overflow-auto bg-slate-100 p-4 hideScrollBar">
        <section className="space-y-4 bg-white flex-1 p-4">
          <div className="flex gap-2 items-center">
            <FaBookOpen />
            <label className="font-semibold text-md">Leave Application</label>
          </div>
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {remainingLeaveType !== undefined && (
              <>
                <LeaveCard
                  Days={
                    remainingLeaveType.Casual +
                    remainingLeaveType.Paid +
                    remainingLeaveType.Sick
                  }
                  LeaveType="Annual Leave"
                  onclick={handleLeave}
                />
                <LeaveCard
                  Days={remainingLeaveType.Paid}
                  LeaveType="Paid Leave"
                  onclick={handleLeave}
                />
                <LeaveCard
                  Days={remainingLeaveType.Sick}
                  LeaveType="Sick Leave"
                  onclick={handleLeave}
                />
                <LeaveCard
                  Days={remainingLeaveType.Casual}
                  LeaveType="Casual Leave"
                  onclick={handleLeave}
                />
              </>
            )}
          </div>
          <div className="space-y-4">
            <label className="font-semibold text-md">Leave History</label>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-60">
              <table className="w-full text-sm text-left rtl:text-right text-gray">
                <thead className="text-xs uppercase bg-blue-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name(s)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Duration(s)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      End Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto max-h-60">
                  {leaveApplications !== undefined &&
                    leaveApplications.map(
                      (leaveApplication: LeaveApplications) => (
                        <tr
                          className="odd:bg-white even:bg-blue-50 border-b"
                          key={leaveApplication.Id}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            ABC
                          </th>
                          <td className="px-6 py-4">
                            {(
                              DateToDays(leaveApplication.EndDate) -
                              DateToDays(leaveApplication.StartDate) +
                              1
                            ).toFixed(0)}
                          </td>
                          <td className="px-6 py-4">
                            {leaveApplication.StartDate}
                          </td>
                          <td className="px-6 py-4">
                            {leaveApplication.EndDate}
                          </td>
                          <td className="px-6 py-4">
                            {leaveApplication.LeaveType}
                          </td>
                          <td className="px-6 py-4">
                            {leaveApplication.Status}
                          </td>
                          <td className="py-4 text-center">
                            <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none">
                              Actions
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const LeaveCard = ({ Days, LeaveType, onclick }: LeaveApply) => {
  return (
    <div className="p-4 bg-blue-800 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="p-2 rounded-full bg-white text-blue-800 w-16 h-16 flex flex-col items-center justify-center text-2xl font-semibold">
          {Days}
        </div>
        <div className="flex flex-col gap-1 mr-5">
          <label className="text-white">{LeaveType}</label>
          {LeaveType !== "Annual Leave" && <button
            className="rounded-full w-full bg-yellow-400 text-sm"
            onClick={() => {
              const val = LeaveType.replace(/\s+/g, "");
              onclick(val);
            }}
          >
            Apply
          </button>} 
          
        </div>
      </div>
    </div>
  );
};
