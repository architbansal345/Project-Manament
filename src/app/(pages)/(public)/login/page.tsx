"use client";
import { loginUser } from "@/services/authservice";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [form] = Form.useForm();


  const handleSubmit = async(val: any) => {
    const data  = {
      email:val.email,
      password:val.password
    }
    try {
      const values = await loginUser(data);
      console.log("Form values:", values);
    } catch (err) {
      console.error("Form validation failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-4 rounded-xl border p-6 w-1/3 bg-white shadow-lg">
        <label className="font-semibold text-2xl">Sign in with email</label>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ email: "", password: "" }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              iconRender={(visible) => (visible ? <FaEyeSlash /> : <FaEye />)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
            <Link
              href="/"
              className="text-sm text-blue-500 cursor-pointer hover:underline mt-2 block text-right"
            >
              Forgot password?
            </Link>
          </Form.Item>
        </Form>

        <div className="flex items-center w-full">
          <div className="flex-grow border-b border-gray-300"></div>
          <p className="mx-2 text-sm text-gray-600">Or Sign in with</p>
          <div className="flex-grow border-b border-gray-300"></div>
        </div>

        <div className="flex justify-center gap-5 w-full">
          <button className="px-8 py-2 rounded-lg border flex items-center justify-center w-full sm:w-auto">
            <FaGoogle className="text-red-500 mr-2" />
            Google
          </button>
          <button className="px-8 py-2 rounded-lg border flex items-center justify-center w-full sm:w-auto">
            <FaFacebook className="text-blue-500 mr-2" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
