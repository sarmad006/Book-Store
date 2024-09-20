import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <>
            <div className="grid md:grid-cols-5 bg-skin-darkBlue text-white  p-10 grid-cols-1 mt-20 border-b-2 border-gray-200">
                <div className=" text-center m-auto">
                    <img className="w-56 m-auto" src="/logo.png" alt="logo" />
                    <p className="hidden lg:block">Make your academic life easier with Qthrift Items</p>
                </div>
                <div className=" m-auto text-center md:text-left my-7">
                    <h2 className="text-xl font-bold mb-2">Know Us</h2>
                    <Link legacyBehavior href="/">
                    <a className="py-2 hover:underline transition-all">About</a>
                    </Link>
                    <Link legacyBehavior href="/">
                    <a className="block py-2 hover:underline transition-all">Project Details</a>
                    </Link>
                </div>
                <div className="m-auto text-center md:text-left my-7">
                    <h2 className="text-xl font-bold mb-2">Security</h2>
                    <Link legacyBehavior href="/">
                    <a className="py-2 hover:underline transition-all">Privacy Policy</a>
                    </Link>
                    <Link legacyBehavior href="/">
                    <a className="block py-2 hover:underline transition-all">Terms of Use</a>
                    </Link>
                </div>
                <div className="m-auto text-center md:text-left my-7">
                    <h2 className="text-xl font-bold mb-2">Contact & Help</h2>
                    <Link legacyBehavior href="/">
                    <a className="py-2 hover:underline transition-all">FAQ</a>
                    </Link>
                    <Link legacyBehavior href="/">
                    <a className="block py-2 hover:underline transition-all">Contact</a>
                    </Link>
                    <Link legacyBehavior href="/">
                    <a className="block pb-2 hover:underline transition-all">Report a Issue</a>
                    </Link>
                </div>
               
            </div>
            <div className="bg-skin-darkBlue flex justify-between px-[7vw] sm:flex-row flex-col py-5">
                <p className="text-center text-white ">Copyright&copy; Qthrift 2023</p>

                <p className="text-center text-white sm:pt-0 pt-4 cursor-pointer">Powered by Qthrift</p>

            </div>
        </>
    )
}

export default Footer
