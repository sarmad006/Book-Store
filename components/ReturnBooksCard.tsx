import React from "react";
import Link from "next/link";
import TimeLeft from "./utils/TimeLeft";
import { loadStripe } from "@stripe/stripe-js";

const ReturnBooksCard = (props) => {
  function clickOnChild(event) {
    event.stopPropagation();
  }
  console.log("props", props);
  const asyncStripe = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const handleReturn = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    try {
      let lineItems = [
        {
          price_data: {
            currency: "QAR",
            product_data: {
              images: [props.img],
              name: props.name,
            },
            unit_amount: props.borrowRate * 100 * getTotal(props.timeLeft) + isPenalty(props.timeLeft) ,
          },
          quantity: 1,
        },
      ];
       let orderDetails = {
        bookID : props._id,
        buyerId : props.userId,
        status : 'pending',
        paymentType : 'return',
        metaData: {
          data : lineItems
        }
       }
        const stripe = await asyncStripe;
        const res = await fetch("/api/stripe/session", {
          method: "POST",
          body: JSON.stringify({
            lineItems : lineItems,
            orderDetails
          }),
          headers: { "Content-Type": "application/json" },
        });
        const { sessionId } = await res.json()
        const { error } = await stripe.redirectToCheckout({ sessionId });
        console.log(error);
    } catch (err) {
      console.log(err);
    }
  };

  function isPenalty(dateString) {
    const givenTime = new Date(dateString);

    const currentTime = new Date();

    const givenTimeMs = givenTime.getTime();
    const currentTimeMs = currentTime.getTime();

    const tenMinutesMs = parseInt(process.env.NEXT_PUBLIC_PENALTY_TIME) ;
    const givenTimePlusTenMinutesMs = givenTimeMs + tenMinutesMs;
    return currentTimeMs >= givenTimePlusTenMinutesMs ? 500 : 0;
  }
  
  function getTotal(dateString) {
    const providedDate = new Date(dateString);
    console.log(providedDate.getDay());
    const currentDate = Date.now();

    const differenceInMilliseconds = currentDate - providedDate.getTime();

    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  }
  return (
    <>
      <div className="w-[266px] cursor-pointer scale-90">
        <div>
          <img
            className=" h-[270px] w-[266px] rounded-lg mb-3"
            src={props.img}
            alt=""
          />
          <div onClick={clickOnChild}></div>
        </div>
        <div className="flex justify-between">
          <h1 className="w-[215px] font-semibold text-xl mb-2">{props.name}</h1>
          <div>
            <button
              onClick={handleReturn}
              className="bg-skin-darkBlue text-white py-1 px-4 rounded-lg shadow-lg font-bold transition-all"
            >
              Return
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <TimeLeft date={props.timeLeft} />
        </div>
      </div>
    </>
  );
};

export default ReturnBooksCard;
