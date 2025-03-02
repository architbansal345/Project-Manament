"use client";
import Header from "@/components/header";
import { totalLeaves } from "@/constant/totalLeave";
import { RemainingLeave } from "@/services/privateAPI/private";
import { Button, Progress } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBirthdayCake } from "react-icons/fa";
import "./index.css";

export default function Dashboard() {
  const router = useRouter();
  const [remainingLeaveType, setRemainingLeave] = useState<
    LeaveType | undefined
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
  useEffect(() => {
    remainingLeave();
  }, []);
  return (
    <div className="flex flex-col flex-1 h-screen">
      <Header />
      <main className="flex flex-1 flex-col gap-6 overflow-auto bg-slate-100 p-4">
        <section className="space-y-2">
          <label className="font-bold text-md text-blue-800">Dashboard</label>
          <div className="bg-blue-800 rounded-lg shadow-md p-5">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <CgProfile className="w-12 h-12 text-white" />
                <div className="space-y-1 text-white">
                  <label className="font-medium text-lg">Archit Bansal</label>
                  <p className="text-md">Full Stack developer</p>
                </div>
              </div>
              <Button className="bg-yellow-500 text-white">Edit Profile</Button>
            </div>
          </div>
        </section>
        <section className="space-y-2">
          <label className="font-bold text-md ">Quick Action</label>
          <div className="flex space-x-4">
            <Button
              className="rounded-full shadow-md"
              onClick={() => router.push("/dashboard/leaveApplication")}
            >
              Apply for Leave
            </Button>
            <Button className="rounded-full shadow-md">View PaySlip</Button>
          </div>
        </section>
        <section className="grid md:grid-cols-3 gap-4 flex-1">
          <div className="border p-4 rounded-lg bg-white h-72 overflow-auto hideScrollBar">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">
                Available Leave days
              </label>
              {remainingLeaveType !== undefined && (
                <>
                  <LeaveProgressBar
                    leavetype="Annual"
                    remainingDays={
                      remainingLeaveType.Paid +
                      remainingLeaveType.Casual +
                      remainingLeaveType.Sick
                    }
                    totalDays={totalLeaves.total}
                  />

                  <LeaveProgressBar
                    leavetype="Sick"
                    remainingDays={remainingLeaveType.Sick}
                    totalDays={totalLeaves.sick}
                  />
                  <LeaveProgressBar
                    leavetype="Paid"
                    remainingDays={remainingLeaveType.Paid}
                    totalDays={totalLeaves.paid}
                  />
                  <LeaveProgressBar
                    leavetype="Casual"
                    remainingDays={remainingLeaveType.Casual}
                    totalDays={totalLeaves.casual}
                  />
                </>
              )}
            </div>
          </div>
          <div className="border p-4 rounded-lg bg-white h-72 overflow-auto hideScrollBar">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">To-dos</label>
              <div className="space-y-2 overflow-auto">
                {[0,1,2,3,4].map(() => <div className="rounded-md p-2 bg-slate-100 text-sm text-gray-800">
                  <p>Complete Login Screen</p>
                </div>)}              
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-lg bg-white h-72 overflow-auto hideScrollBar">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">
                December Pay Slip breakDown
              </label>
              <div className=" space-y-2 overflow-auto">
                <div className="grid grid-cols-4 rounded-md p-2 bg-slate-300 text-sm text-gray-800 justify-items-center items-center">
                  <p>Earnings</p>
                  <p>Amount</p>
                  <p>Deductions</p>
                  <p>Total</p>
                </div>
                <div className="grid grid-cols-4 rounded-md p-2 bg-slate-100 text-sm text-gray-800 justify-items-center items-center">
                  <p>Basic Wage</p>
                  <p>150000</p>
                  <p>30000</p>
                  <p>120000</p>
                </div>
                <div className="grid grid-cols-4 rounded-md p-2 bg-slate-100 text-sm text-gray-800 justify-items-center items-center">
                  <p>Tax</p>
                  <p>15000</p>
                  <p>3000</p>
                  <p>12000</p>
                </div>
                <div className="grid grid-cols-4 rounded-md p-2 bg-slate-100 text-sm text-gray-800 justify-items-center items-centers">
                  <p>Pension</p>
                  <p>15000</p>
                  <p>3000</p>
                  <p>12000</p>
                </div>
                <div className="grid grid-cols-4 rounded-md p-2 bg-slate-100 text-sm text-gray-800 justify-items-center items-center">
                  <p>Total</p>
                  <p>150000</p>
                  <p>36000</p>
                  <p>114000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div className="border p-4 rounded-lg bg-white h-72 overflow-auto hideScrollBar">
              <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">Birthdays</label>
                <div className="space-y-2 ">
                {[0,1,2,3].map(() => <div className="rounded-md p-2 bg-slate-100 text-sm text-gray-800 flex justify-between items-center">
                    
                    <div className="flex gap-3 items-center">
                      <FaBirthdayCake />
                      <p>Bansal's Day - 19-12-2024</p>
                    </div>
                    <button className="rounded-lg px-4 py-1 bg-yellow-500 font-semibold hover:bg-yellow-800 shadow-lg hover:text-white ">
                      Send Wishes
                    </button>
                  </div>)}                  
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 pointer-events-none w-full h-full">
              <div className="ballon ballon-1"></div>
              <div className="ballon ballon-2"></div>
              <div className="ballon ballon-3"></div>
              <div className="ballon ballon-4"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const LeaveProgressBar = ({
  leavetype,
  remainingDays,
  totalDays,
}: {
  leavetype: string;
  remainingDays: number;
  totalDays: number;
}) => {
  const leavepercent = (remainingDays / totalDays) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-400">
        <p>{leavetype} Leave</p>
        <p>
          {remainingDays} of {totalDays} days
        </p>
      </div>
      <Progress
        percent={leavepercent}
        status="active"
        strokeColor="blue-800"
        showInfo={false}
      />
    </div>
  );
};
