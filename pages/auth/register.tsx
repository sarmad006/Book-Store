import React, { useState, useReducer } from "react";
import InputField from "@/components/register/inputField";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { toast } from "react-toastify";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { formReducer } from "../../utils/hooks/formReducer";
import { registerForm } from "../../interfaces";
import Link from "next/link";

const initialFormState: registerForm = {
  email: "",
  password: "",
  confirmpassword: "",
  name: "",
};

const Register = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      type: "HANDLE INPUT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/create`,
        formData
      );
      toast.success(`Welcome ${formData.name} to Qthrift`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      router.push("/auth/login");
    } catch (error) {
      console.log(error, error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
    setTimeout(() => {
      setLoading(false);
      setFormData({
        type: "EMPTY",
      });
    }, 500);
  };

  return (
    <div className="flex flex-col justify-between  ">
      <div className="bg-[#f8f9f8] h-[25vh] flex items-center justify-center py-6">
        <div>
          <h3 className="text-graytextColor  text-4xl font-bold">
            Authentication
          </h3>
        </div>
      </div>
      {/* <Login /> */}
      <div className="flex flex-col mx-10 py-2 mt-4 rounded-lg  items-start gap-y-4 ">
        {isLoading && (
          <RingSpinnerOverlay color="#fe4a55" loading={isLoading} />
        )}
        <div>
          <h1 className="text-graytextColor py-2 text-4xl font-bold border-b-[3px] border-lightRed">
            REGISTER
          </h1>
        </div>
        <div className="flex flex-col justify-center rounded-xl items-start  w-full">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 w-5/6 p-4">
              <InputField
                label="Name"
                placeholder="james"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
              <InputField
                label="Email"
                placeholder="james@yahoo.com"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
              <InputField
                label="Password"
                placeholder="****"
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
              <InputField
                label="Confirm Password"
                placeholder="****"
                type="password"
                name="confirmpassword"
                onChange={handleChange}
                value={formData.confirmpassword}
              />
            </div>
            <div className="flex flexcojustify-center items-center px-4 w-full  gap-x-8">
              <button
                type="submit"
                className="bg-lightRed text-lg tracking-wider font-bold  text-white px-2 w-1/6 py-3 rounded-md shadow-xl focus:outline-none "
              >
                REGISTER
              </button>
              <Link href="/auth/login">
                <span className=" tracking-wide font-medium text-lg text-blue-700 border-b-2 border-blue-700">
                  Already a user?
                </span>
              </Link>
            </div>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
