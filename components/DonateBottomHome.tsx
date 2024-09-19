import React from "react";
import Link from "next/dist/client/link";

const DonateBottomHome = ({topLoader}) => {
  return (
    <div className=" w-11/12 mx-auto my-10">
      <div className="bg-skin-darkBlue text-white rounded-xl sm:h-[30vh] px-3">
          <div className="flex flex-col sm:flex-row text-center sm:text-left justify-between h-full ">
            <div className="ml-0 sm:ml-7 my-auto ">
              <h1 className="text-2xl sm:text-4xl font-bold mb-2">Spread </h1>
              <h1 className="text-xl sm:text-2xl font-bold">
                Education and Help your colleague
              </h1>

            </div>
            <div className="my-auto text-center">
            <Link href="/">
            <button className="font-bold bg-none  text-white rounded-xl py-2 px-4 my-3 text-md sm:text-lg hover:bg-transparent  transition-all border-2 md:mr-7" onClick={()=> {topLoader()}}>
             Borrow Now
            </button>
            </Link>
            </div>
          </div>
      </div>
    </div>
  );
};

export default DonateBottomHome;