import React from 'react'
import { useState } from 'react';
import Link from "next/link"
import { useSession } from "next-auth/react";
import { template } from '@/helpers/template';

const ProductCardDonationDisplay = (props) => {
  const {templateString} = template;

  const { data: session } = useSession();
  const mail = session?.user?.email;

  
    const [state, setstate] = useState(true);
    // function changeState() {
    //   setstate((state = !state));
    // }
    function clickOnChild(event){
      event.stopPropagation()
    }

        // //Getting the mail only and Sending it to the API end Point.
        // const addToFavourite = async() => {
    
        //   // setstate((state = !state));
        //     const res = await fetch(`${templateString}/api/user/favd/add`, {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         seller_mail: mail,
        //         _id: props._id,
                
      
        //       }),
        //     })
        //   }
      
          // const delFromFavourite = async() => {
            
          //   // setstate((state = !state));
          //   const res = await fetch(`${templateString}/api/user/favd/delete`, {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       seller_mail: mail,
          //       _id: props._id
                
      
          //     }),
          //   })
          // }
    return (
        <>
          <Link href={'/productdetailsdonate/[uid]/[pid]'} as={`/productdetailsdonate/${props.seller_id}/${props._id}`}>
            <div className="w-[266px] cursor-pointer scale-90">  
            <div>
               <img className=" h-[270px] w-[266px] rounded-lg mb-3" src={props.img} alt="" />
               <div onClick={clickOnChild}>
          </div>
            </div>
            <h1 className="w-[215px] font-semibold text-xl mb-2">{props.name}</h1>
            <div className="flex">
            <span className="font-bold text-base">{props.condition}</span>
            <span className="pl-1"><svg xmlns="http://www.w3.org/2000/svg" className="h- w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg></span>
            </div>
        </div>
        </Link>
        </>
    )
}

export default ProductCardDonationDisplay