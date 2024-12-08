import Header from "@/components/header";
import { Button, Progress } from "antd";
import { CgProfile } from "react-icons/cg";

export default function Dashboard() {
  return (
    <div className="h-screen">
      <Header />
      <main className="flex flex-1 flex-col h-[calc(100vh-5rem)] gap-6 overflow-auto bg-slate-100 p-4">
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
            <Button className="rounded-full shadow-md">Apply for Leave</Button>
            <Button className="rounded-full shadow-md">View PaySlip</Button>
          </div>
        </section>
        <section className="grid md:grid-cols-3 space-x-4">
          <div className="border p-4 rounded-lg bg-white h-72">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">
                Available Leave days
              </label>
              <div>
                <div className="flex justify-between text-sm text-gray-400">
                  <p>Annual Leave</p>
                  <p>10 of 15 days</p>
                </div>
                <Progress
                  percent={35}
                  status="active"
                  strokeColor="blue-800"
                  showInfo={false}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400">
                  <p>Sick Leave</p>
                  <p>5 of 10 days</p>
                </div>
                <Progress
                  percent={0}
                  status="active"
                  strokeColor="blue-800"
                  showInfo={false}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400">
                  <p>Casual Leave</p>
                  <p>0 of 15 days</p>
                </div>
                <Progress
                  percent={35}
                  status="active"
                  strokeColor="blue-800"
                  showInfo={false}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400">
                  <p>Paid Leave</p>
                  <p>2 of 10 days</p>
                </div>
                <Progress
                  percent={15}
                  status="active"
                  strokeColor="blue-800"
                  showInfo={false}
                />
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-lg bg-white h-72 overflow-auto">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold">To-dos</label>
              <div className="space-y-2 overflow-auto">
                <div className="rounded-md p-2 bg-slate-100 text-sm text-gray-800">
                  <p>Complete Login Screen</p>
                </div>
                <div className="rounded-md p-2 bg-slate-100 text-sm text-gray-800">
                  <p>Complete Login Screen</p>
                </div>
                <div className="rounded-md p-2 bg-slate-100 text-sm text-gray-800">
                  <p>Complete Login Screen</p>
                </div>
                <div className="rounded-md p-2 bg-slate-100 text-sm text-gray-800">
                  <p>Complete Login Screen</p>
                </div>
                <div className="rounded-md p-2 bg-slate-100 text-sm text-gray-800">
                  <p>Complete Login Screen</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-lg bg-white h-72">
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
        </section>
      </main>
    </div>
  );
}
