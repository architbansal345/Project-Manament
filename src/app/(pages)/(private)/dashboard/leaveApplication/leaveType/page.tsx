"use client";
import Header from "@/components/header";
import { LeaveSubmitted } from "@/modals/leaveApplication";
import { ApplicationSubmit } from "@/services/privateAPI/private";
import { Button, DatePicker, Form, Input, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { FaBookOpen } from "react-icons/fa";
import { TbFileUpload } from "react-icons/tb";
import { toast } from "react-toastify";
import  { Dayjs } from "dayjs";
import { LeaveEnum } from "@/constant/totalLeave";


const leaveType: Record<string, string> = {
  AnnualLeave: "Annual Leave",
  PaidLeave: "Paid Leave",
  CasualLeave: "Casual Leave",
  SickLeave: "Sick Leave"
};

export interface ApplicationForm {
  leaveType:string;
  startDate:Dayjs;
  endDate:Dayjs;
  reasonLeave:string;
  choosefile:File;
}

function LeaveTypeForm() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const router = useRouter();

  const params = useSearchParams();
  const leave = params.get("leave");

  const  [greatJob,setGreatJob] = useState<boolean>(false);

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    let fileList: UploadFile[] = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);

    const file = info.file;
    if (file.status === "done") {
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const [form] = Form.useForm();
  const handleSubmit = async (val: ApplicationForm) => {
  const startDate = val.startDate.format("YYYY-MM-DD");
  const endDate = val.endDate.format("YYYY-MM-DD");

  const formData = new FormData();
  const leaveType = val.leaveType as keyof typeof LeaveEnum
  formData.append('leaveType', LeaveEnum[leaveType]);
  formData.append('startDate', startDate);
  formData.append('endDate', endDate);
  formData.append('reason', val.reasonLeave);
  if (fileList.length > 0 && fileList[0].originFileObj){
    formData.append("file",fileList[0].originFileObj)
  }
    
    try {
      const dataStatus = await ApplicationSubmit(formData);
      if( dataStatus.status === "success"){
        console.log(dataStatus);
        setGreatJob(true);  
      }
    }catch(err) {
      toast.error("Unable to Submit Application");
      return;
    }
  };

  const beforeUpload = (file: File) => {
    console.log("File selected:", file);
    return true;
  };

  const handleCloseDialog = () => {
    setGreatJob(false);
    router.push("/leaveApplication")
  }

  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <main className="flex-1 overflow-auto bg-slate-100 p-4 h-[calc(100vh-5rem)] hideScrollBar">
        <section className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col gap-4 justify-center items-center mb-6">
            <div className="flex gap-2 items-center">
              <FaBookOpen />
              <h2 className="font-semibold text-2xl text-gray-800">
                Leave Application
              </h2>
            </div>
            <p className="text-gray-600">
              Fill the required fields below to apply for annual leave
            </p>
          </div>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ leaveType: leaveType[leave ?? "PaidLeave"] , startDate:"" , endDate:"" , reasonLeave:"" , choosefile:"" }}
            onFinish={handleSubmit}
            className="space-y-4"
          >
            <Form.Item
              name="leaveType"
              label={<span className="font-semibold text-md">Leave Type</span>}
            >
              <Input disabled />
            </Form.Item>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <Form.Item
                name="startDate"
                label={<span className="font-semibold text-md">Start Date</span>}
                rules={[
                  { required: true, message: "Please enter Start date" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const endDate = getFieldValue("endDate");
                      if (!value || !endDate || value.isBefore(endDate)) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Start date must be before End date");
                    },
                  }),
                ]}
              >
                <DatePicker
                  placeholder="Enter Start Date"
                  className="w-full"
                  placement="bottomLeft"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
              <Form.Item
                name="endDate"
                label={<span className="font-semibold text-md">End Date</span>}
                rules={[
                  { required: true, message: "Please enter End date" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const startDate = getFieldValue("startDate");
                      if (!value || !startDate || value.isAfter(startDate)) {
                        return Promise.resolve();
                      }
                      return Promise.reject("End date must be after Start date");
                    },
                  }),
                ]}
              >
                <DatePicker
                  placeholder="Enter End Date"
                  className="w-full"
                  placement="bottomLeft"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </div>
            <Form.Item
              name="reasonLeave"
              label={<span className="font-semibold text-md">Reason for leave</span>}
              rules={[{ required: true, message: "Please enter Reason for leave" }]}
            >
              <TextArea
                rows={3}
                placeholder="Enter your description here"
                style={{ resize: "none" }}
              />
            </Form.Item>

            <Form.Item
              name="choosefile"
              label={<span className="font-semibold text-md">Attach handover document (pdf,jpg,docs or any other format)</span>}
              rules={[{ required: true, message: "Please Attach documents" }]}
              className="w-full"
            >
              <Upload
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                showUploadList={{ showRemoveIcon: true }}
              >
                <Button icon={<TbFileUpload />}>Select File</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Submit Application
              </Button>
            </Form.Item>
          </Form>
        </section>
      </main>
      {greatJob && <LeaveSubmitted label="Great Job" Sublabel="Your Leave Application would be reviewed by the Admin." onClick={handleCloseDialog}/>}
      
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeaveTypeForm />
    </Suspense>
  );
}
