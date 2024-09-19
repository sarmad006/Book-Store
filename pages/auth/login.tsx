import React, { useState, useRef, useContext } from "react";
import InputField from "@/components/register/inputField";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { toast } from "react-toastify";
import axios from "axios";
import { getSession, signIn, useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "@/Context/userContext";

const Login: React.FC = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function isPenalty(dateString) {
    const givenTime = new Date(dateString);

    const currentTime = new Date();

    const givenTimeMs = givenTime.getTime();
    const currentTimeMs = currentTime.getTime();

    const tenMinutesMs = parseInt(
      process.env.NEXT_PUBLIC_PENALTY_TIME.toString()
    );
    console.log("tenMinutes", tenMinutesMs);
    const givenTimePlusTenMinutesMs = givenTimeMs + tenMinutesMs;
    return currentTimeMs >= givenTimePlusTenMinutesMs;
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const res = await signIn("credentials", {
        ...formData,
        redirect: false,
      });
      console.log(res);
      if (res && res.error === null) {
        const session : any = await getSession();
        console.log("session", session);
        if (session) {
          if (session.user.name.toLowerCase() != "admin") {
            axios
              .post(
                `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/borrowBooks`,
                {
                  userId: session.user.id,
                }
              )
              .then((res) => {
                let dates = res.data.borrowedBooks.map((f) => f.borrowedAt);
                const hasPenalty = dates.some((date) => isPenalty(date));
                console.log("hasPenalty", hasPenalty);
                setUserDetails({ ...session.user, penalty: hasPenalty });
              });
          }
        }
        router.push("/");
      } else {
        toast.error(res.error, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
    setTimeout(() => {
      setLoading(false);
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
            Login
          </h1>
        </div>
        <div className="flex flex-col justify-center rounded-xl items-start  w-full">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 w-2/6 p-4">
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
            </div>
            <div className="flex justify-start px-4 w-full items-center  gap-x-8">
              <button
                type="submit"
                className="bg-lightRed text-lg tracking-wider font-bold  text-white px-2 w-1/6 py-3 rounded-md shadow-xl focus:outline-none "
              >
                LOGIN
              </button>
              <Link href="/auth/register">
                <span className=" tracking-wide font-medium text-lg text-blue-700 border-b-2 border-blue-700">
                  Not a user?
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

export default Login;
