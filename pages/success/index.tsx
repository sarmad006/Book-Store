import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Success = () => {
  const [redirectSeconds, setRedirectSeconds] = useState<number>(5);
  const [apiCallComplete, setApiCallComplete] = useState<boolean>(false); // State to track API call completion
  const router = useRouter();
  let { paymentId } = router.query;

  useEffect(() => {
    if (paymentId && !apiCallComplete) { // Check if paymentId exists and API call is not complete
      axios
        .post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/stripe/completePayment`, {
          paymentId,
        })
        .then((res) => {
          console.log("res", res);
          setApiCallComplete(true); // Set the state to indicate API call completion
        })
        .catch((error) => {
          console.error("Error occurred while completing payment:", error);
        });
    }
  }, [paymentId, apiCallComplete]);

  useEffect(() => {
    if (!apiCallComplete) return; // Don't start redirect if API call is not complete

    if (redirectSeconds === 0) {
      router.push("/");
      return;
    }

    const timeoutId = setTimeout(() => {
      console.log(redirectSeconds);
      setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [redirectSeconds, apiCallComplete]);

  return (
    <>
      <Head>
        <title>Success Page</title>
      </Head>
      <div className="h-screen flex flex-col gap-y-2 justify-center items-center">
        <h1 className="text-black text-4xl">Thanks for buying from Qthrift </h1>
        <span>Redirecting in {redirectSeconds} ...</span>
      </div>
    </>
  );
};

export default Success;
