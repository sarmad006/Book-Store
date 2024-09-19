import React from "react";
import Link from "next/link";

const PendingBooksCard = (props) => {
  function clickOnChild(event) {
    event.stopPropagation();
  }
  let path = props.status === "Issued" || props.status == "Borrowed" ? "/approvedBook" : "/pendingBook";
  let url = `${path}/${props._id}`;
  return (
    <>
      <Link href={url}>
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
            <h1 className="w-[215px] font-semibold text-xl mb-2" >
              {props.name}
            </h1>
            <div className="flex">
              <span className="font-bold text-base">{props.condition}</span>
              <span className="pl-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h- w-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <p>{props.authorName}</p>
            {props.isBorrow ? (
              <p> QAR {props.borrowRate} (Daily)</p>
            ) : (
              <p>
                {props.price ? (
                  `QAR ${props.price}`
                ) : (
                  <span className="text-lightRed font-semibold">
                    {" "}
                    Donation{" "}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default PendingBooksCard;
