import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import Details from "./Details";

const PendingDetail = (props) => {
  console.log("props",props)
  const [comments, setComments] = useState("");
  return (
    <>
     <Details props={props}/> 

      <div className="w-full mt-6 px-24">
        <h3 className="text-3xl font-semibold border-b-4 border-lightRed">
          Actions
        </h3>
        <div className="flex flex-col gap-y-6 py-8">
          {/* <div className="w-full flex flex-col gap-y-2">
            <label className="font-medium">Comments (optional)</label>
            <Textarea
              onChange={(e) => setComments(e.target.value)}
              className="w-full"
              placeholder="Feedback..."
              rows={4}
            />
          </div> */}
          <div className="flex gap-x-4">
            <button
              onClick={(e) => props.action(e, comments, true)}
              className=" bg-skin-darkBlue text-md tracking-wider font-bold mt-4 w-2/12  text-white py-3 rounded-md shadow-xl focus:outline-none inline-flex items-center justify-center gap-x-1"
            >
              Approve
            </button>
            <button
              onClick={(e) => props.action(e, comments, false)}
              className=" bg-lightRed text-md tracking-wider font-bold mt-4 w-2/12  text-white py-3 rounded-md shadow-xl focus:outline-none inline-flex items-center justify-center gap-x-1"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingDetail;
