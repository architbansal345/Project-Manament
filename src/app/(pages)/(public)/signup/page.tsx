"use client";
import { registerUser } from "@/services/authservice";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface RegisterUser {
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  confirmPassword:string
}

export default function Signup() {
  const [form] = Form.useForm();
  const router = useRouter();


  const RegisterUser = async(val:RegisterUser) => {
    const UserData = {  
      firstName:val.firstName,
      lastName:val.lastName,
      email:val.email,
      password:val.password,
      confirmPassword:val.confirmPassword
    }
    try{ 
      const data = await registerUser(UserData);
      if(data.status === "success"){
        router.push("/login");
      }
    }catch(err){
      console.error("Failed to Register User" , err);
    }finally{
      
    }
  }
  return (
    <div className="flex justify-center items-center w-full h-screen p-4">
      <div className="flex flex-col gap-4 rounded-xl border p-6 w-2/5 bg-white shadow-lg">
        <label className="font-semibold text-2xl">Register</label>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onFinish={RegisterUser}
        >
          <div className="flex gap-2">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Please enter first name" }]}
              className="flex-1" 
            >
              <Input placeholder="Enter your FirstName" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Please enter last name" }]}
              className="flex-1" 
            >
              <Input placeholder="Enter your LastName" />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter Email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <div className="flex gap-2">
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter Password" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
              className="flex-1" 
            >
              <Input.Password placeholder="Enter your Password" iconRender={(visible) => (visible ? <FaEyeSlash /> : <FaEye />)}/>
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please enter Confirm Password" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
              className="flex-1" >
              <Input.Password placeholder="Enter your Confirm Password" iconRender={(visible) => (visible ? <FaEyeSlash /> : <FaEye />)}/>
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="flex justify-center items-center gap-1">
          <span>Already have an Account? </span>
          <Link href="/" className="text-sm text-blue-500 cursor-pointer hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
