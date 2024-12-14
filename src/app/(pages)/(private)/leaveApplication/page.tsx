"use client";
import Header from "@/components/header";
import { FaBookOpen } from "react-icons/fa";

interface LeaveApplication {
  Days: number;
  LeaveType: string;
  onclick: (val: string) => void;
}
export default function LeaveApplication() {
  return (
    <div className="h-screen">
      <Header />
      <main className="flex-1 h-[calc(100vh-5rem)] gap-6 overflow-auto bg-slate-100 p-4">
        <section className="space-y-4 bg-white flex-1 p-4">
          <div className="flex gap-2 items-center">
            <FaBookOpen />
            <label className="font-semibold text-md">Leave Application</label>
          </div>
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <LeaveCard
              Days={10}
              LeaveType="Anuual Leave"
              onclick={(val: string) => console.log(val)}
            />
            <LeaveCard
              Days={20}
              LeaveType="Paid Leave"
              onclick={(val: string) => console.log(val)}
            />
            <LeaveCard
              Days={14}
              LeaveType="Sick Leave"
              onclick={(val: string) => console.log(val)}
            />
            <LeaveCard
              Days={14}
              LeaveType="Casual Leave"
              onclick={(val: string) => console.log(val)}
            />
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
                      Reason(s)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto max-h-60">
                  <tr className="odd:bg-white even:bg-blue-50 border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      ABC
                    </th>
                    <td className="px-6 py-4">2</td>
                    <td className="px-6 py-4">22/04/2022</td>
                    <td className="px-6 py-4">22/04/2022</td>
                    <td className="px-6 py-4">Sick</td>
                    <td className="px-6 py-4">Personal</td>
                    <td className="py-4 text-center">
  <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none">
    Actions
  </button>
</td>

                  </tr>
                  <tr className="odd:bg-white even:bg-blue-50 border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      ABC
                    </th>
                    <td className="px-6 py-4">2</td>
                    <td className="px-6 py-4">22/04/2022</td>
                    <td className="px-6 py-4">22/04/2022</td>
                    <td className="px-6 py-4">Sick</td>
                    <td className="px-6 py-4">Personal</td>
                    <td className="py-4 text-center">
  <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none">
    Actions
  </button>
</td>

                  </tr>
                  <tr className="odd:bg-white even:bg-blue-50 border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      ABC
                    </th>
                    <td className="px-6 py-4">2</td>
                    <td className="px-6 py-4">22/04/2022</td>
                    <td className="px-6 py-4">22/04/2022</td>
                    <td className="px-6 py-4">Sick</td>
                    <td className="px-6 py-4">Personal</td>
                    <td className="py-4 text-center">
  <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none">
    Actions
  </button>
</td>

                  </tr>
                  <tr className="odd:bg-white even:bg-blue-50 border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      ABC
                    </th>
                    <td className="px-6 py-4">2</td>
                    <td className="px-6 py-4">22/04/2022</td>
                    <td className="px-6 py-4">22/04/2022</td>
                    <td className="px-6 py-4">Sick</td>
                    <td className="px-6 py-4">Personal</td>
                    <td className="py-4 text-center">
  <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none">
    Actions
  </button>
</td>

                  </tr>
                 

                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const LeaveCard = ({ Days, LeaveType, onclick }: LeaveApplication) => {
  return (
    <div className="p-4 bg-blue-800 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="p-2 rounded-full bg-white text-blue-800 w-16 h-16 flex flex-col items-center justify-center text-2xl font-semibold">
          {Days}
        </div>
        <div className="flex flex-col gap-1 mr-5">
          <label className="text-white">{LeaveType}</label>
          <button
            className="rounded-full w-full bg-yellow-400 text-sm"
            onClick={() => onclick(LeaveType)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
