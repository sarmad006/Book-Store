import React from 'react'
import Link from 'next/dist/client/link'
import {BiChevronLeft} from "react-icons/bi"

const GeneralSidebar = (props) => {
    return (

        <div className="hidden lg:block ">
            <div className="w-[300px] h-screen shadow-xl bg-sidebar-pattern float-left fixed text-center">
                <h1 className="text-black font-bold text-4xl text-center mt-28">{props.title}</h1>
                <Link href="/">
                <button className=" bg-white text-skin-darkBlue py-2 px-4 text-xl rounded-lg relative top-[45vh] font-medium inline-flex items-center gap-x-1">
                    <BiChevronLeft fontSize={28}/>
                    <span>Back to Home</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default GeneralSidebar
