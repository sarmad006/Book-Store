import { useSession } from 'next-auth/react';
import React,{useState} from 'react'
import Link from "next/link";
import LoadingBar from "react-top-loading-bar";

interface CheckSessionProps{
    text:String
}
const CheckSession = ({text}) => {
    const { data: session } = useSession();
    const [progress,setProgress]=useState(0)
  return (
     <>
      <LoadingBar
        color="#4287f5"
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      /> 
    {!session && (
        <>
          <div className="ml-[0px] lg:ml-[300px] lg:w-[calc(100%-300px)]">
            <div className="flex justify-center mt-[30vh] lg:mt-[40vh]">
              <Link href="/auth/login">
                <button
                  className="bg-skin-lightBlue hover:bg-skin-hoverBlue text-skin-darkBlue p-6 rounded-lg font-bold text-xl"
                  onClick={() => setProgress(30)}
                >
                  {text}
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
      </>
  )
}

export default CheckSession