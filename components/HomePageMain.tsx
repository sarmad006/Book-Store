import React from 'react'
import Link from 'next/link'
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import {BsFillJournalBookmarkFill} from "react-icons/bs"
import {AiOutlineShoppingCart} from "react-icons/ai"

const HomePageMain = () => {
  const [progress, setProgress] = useState(0)
    return (
        <>
        <LoadingBar
        color='#4287f5'
        height = {4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <div className="absolute z-10 right-0 hidden lg:block">
        <img src="/Vector.svg" alt="vector image" />
        
        </div>
        <div className="relative bg-white overflow-hidden">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 relative z-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg">
            <h1 className=" -mt-14 sm:-mt-0 text-4xl font-rokkitt font-semibold tracking-tight text-gray-900 sm:text-6xl relative z-20 leading-[50px]">
            Buy and sell
            your Old Items
            </h1>
            <p className="mt-4 text-xl text-gray-500 relative z-20 ">
            Make your academic life easier with Qthrift Items
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8 z-20 mt-36">
                  <div className="flex items-center space-x-6 lg:space-x-8 ">
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8 ">
                      <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100 ">
                        <img
                          src="/Rectangle 100.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="/Rectangle 138.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden ">
                        <img
                          src="/Rectangle 96.jpeg"
                          alt=""
                          className="mt-5 sm:mt-0 invisible xs:visible w-full h-full object-center object-cover rounded-lg "
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="/Rectangle 102.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="/Rectangle 100.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="/Rectangle 99.jpeg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="/Rectangle 97.jpeg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <Link href="/">
              <button onClick={()=> {setProgress(40); setProgress(100)}}
                className="w-full xs:w-auto  text-center font-bold text-xl bg-lightRed shadow-lg border border-transparent rounded-md py-3 px-10 text-white  transition-all inline-flex items-center gap-x-4 "
              >
               <span>  Buy Now </span>
              <AiOutlineShoppingCart/>
              </button>
              </Link>
              <Link href="/">
              <button onClick={()=> {setProgress(40); setProgress(100)}}
                className="w-full ml-0 mt-5 xs:w-auto xs:ml-6 inline-flex items-center gap-x-4 text-center font-bold text-xl bg-skin-darkBlue border border-transparent shadow-lg rounded-md py-3 px-10 text-white  relative z-20 transition-all"
              >
               <span> Sell </span>
               <BsFillJournalBookmarkFill/>
              </button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div> 
        </>
    )
}

export default HomePageMain