import React, { useContext, useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from "@/Context/cartContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ChakraProvider, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { handleCartItems } from "../../utils/CartHandle";
import { IoAddOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { getSession } from "next-auth/react";

type CartItemType = {
  detail: {
    name: string;
    price: string;
    img: string;
    author: string;
    donation: boolean;
  };
  quantity: number;
};
const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const { cartItems, setcartItems } = useContext(CartContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState<any>({});

  const havesession = async () => {
    const fetchSession: any = await getSession();
    const fetchId = fetchSession?.user?.id;
    return fetchId;
  };
  const fetchData = async () => {
    let userId = await havesession();
    if (userId) {
      let resp = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/UserById`,
        {
          id: userId,
        }
      );
      setUserData(resp.data.result);
    }
  };

  const total: number =
  cartItems.size > 0
    ? Array.from(cartItems).reduce<number>(
        (acc, [key, value]) =>
          acc +
          (value.detail.price !== ''
            ? parseInt(value.detail.price.toString())
            : 0) *
            value.quantity,
        0
      )
    : 0;

  const handleCart = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    key,
    book,
    action
  ) => {
    let tempMap = handleCartItems(key, book, cartItems, action);
    setcartItems(tempMap);
  };
  const handleCheckout = async (
    e: React.SyntheticEvent<HTMLButtonElement>,
    isReward: Boolean
  ) => {
    console.log("isReward", isReward);
    try {
      let keys = [];
      let price = 0;
      let lineItems = Array.from(cartItems).map(
        ([key, value]: [string, CartItemType], index) => {
          console.log(value.detail.price);
          if (value.detail.price != "") {
            price =
              price +
              (isReward && index == 0
                ? parseInt(value.detail.price.toString()) -
                  parseInt(userData.rewardPoints.toString())
                : parseInt(value.detail.price.toString()));
          }
          keys.push(key);
          return {
            price_data: {
              currency: "QAR",
              product_data: {
                images: [value.detail.img],
                name: value.detail.name,
              },
              unit_amount:
                (isReward && index == 0
                  ? parseInt(value.detail.price.toString()) -
                    parseInt(userData.rewardPoints.toString())
                  : (value.detail.price!='' ? parseInt(value.detail.price.toString()) : 0)) * 100,
            },
            quantity: 1,
          };
        }
      );

      let orderDetails = {
        bookID: keys[0],
        buyerId: await havesession(),
        status: "pending",
        paymentType: "bought",
        metaData: {
          data: {
            keys,
            price: price,
            isReward,
          },
        },
      };
      console.log("orderDetails", orderDetails);
      const stripe = await asyncStripe;
      const res = await fetch("/api/stripe/session", {
        method: "POST",
        body: JSON.stringify({
          lineItems : lineItems,orderDetails
        }),
        headers: { "Content-Type": "application/json" },
      });
      const { sessionId } = await res.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });
      console.log(error);
    } catch (err) {
      console.log(err);
    }
    //   onClose()
    //   let body=[]
    //   if(cartItems.size>0){
    //     Array.from(cartItems).map(
    //       ([key, value]: [string, CartItemType]) =>{
    //         body.push({
    //           bookId : key,
    //           status:'Bought'
    //          })
    //       })
    // }
    //   try {
    //     await axios.post(
    //       `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/BookStatusUpdate`,
    //       {
    //         isComment:false,
    //         bookIdsWithStatus:body
    //       }
    //     );
    //     toast.success(`Transaction completed with transaction ID : ${Math.random().toString(36).slice(2)}`, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       theme: "dark",
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   setTimeout(()=>{
    //    router.push("/issuedBooks")
    //    setcartItems(new Map())
    //   },500)
  };
  return (
    <div className="mx-4 mt-2">
      <div className="relative">
        <ChakraProvider>
          <button
            onClick={() => {
              fetchData();
              onOpen();
            }}
          >
            <IoCartOutline fontSize={28} />
          </button>
          <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className="text-skin-darkRed text-3xl font-semibold">
                Item Cart
              </ModalHeader>
              <ModalCloseButton />
              {cartItems.size > 0 ? (
                <ModalBody className="grid grid-cols-4 w-full p-0 gap-x-8">
                  <div className="col-span-3">
                    {Array.from(cartItems).map(
                      ([key, value]: [string, CartItemType], index) => (
                        <div
                          className="flex justify-between mt-2 p-4 border-b-2 border-gray-300 items-center"
                          key={key}
                        >
                          <div className=" flex gap-x-8 items-center justify-start">
                            <img className="w-16 h-16" src={value.detail.img} />
                            <div className="flex flex-col items-start">
                              <p className="w-96 font-semibold">
                                {value.detail.name}{" "}
                              </p>
                              <span className="text-sm">
                                {value.detail.author}
                              </span>
                            </div>
                          </div>
                          {/* <p className="text-center px-4 py-1 text-md border-2 border-gray-300 rounded-md">
                              {value.quantity}
                            </p> */}
                          {/* <div className="flex items-center gap-x-4">
                            <button
                              onClick={(e) =>
                                handleCart(e, key, value.detail, "DeleteOne")
                              }
                            >
                              <FiMinus />
                            </button>
                            <p className="text-center px-4 py-1 text-md border-2 border-gray-300 rounded-md">
                              {value.quantity}
                            </p>
                            <button
                              onClick={(e) =>
                                handleCart(e, key, value.detail, "Add")
                              }
                            >
                              {" "}
                              <IoAddOutline />{" "}
                            </button>
                          </div> */}
                          <p>
                            <span className="font-semibold "> QAR </span>
                            {value.detail.donation ? "0" : value.detail.price}
                          </p>
                          <button
                            onClick={(e) =>
                              handleCart(e, key, value.detail, "DeleteMany")
                            }
                            className="text-red-600 font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      )
                    )}
                  </div>
                  <div className="col-span-1 bg-skin-darkBlue rounded-md p-0 shadow-xl">
                    <div className="flex flex-col items-center h-full justify-between py-20">
                      <p></p>
                      <h3 className="text-white text-2xl ">Order Details</h3>
                      <div className="flex justify-between border-t-2 border-gray-500 w-full px-8 py-4 text-white">
                        <p className="font-medium text-lg ">Total </p>
                        <p className="inline-flex gap-x-2 text-lg">
                          <span className="text-md font-semibold">QAR</span>
                          {total}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleCheckout(e, false)}
                        className="text-white text-md border-2 border-skin-darkBlue px-8 py-2.5"
                      >
                        Checkout
                      </button>
                      {userData.rewardPoints &&
                        parseInt(userData.rewardPoints.toString()) > 0 &&
                        total > userData.rewardPoints && (
                          <button
                            onClick={(e) => handleCheckout(e, true)}
                            className="text-white text-md border-2 border-skin-darkBlue px-8 py-2.5"
                          >
                            Checkout with Reward Points{" "}
                            <span className="line-through pr-2">
                              {total} QAR{" "}
                            </span>
                            <span className="font-semibold">
                              {" "}
                              {parseInt(total.toString()) -
                                parseInt(userData.rewardPoints.toString())}{" "}
                              QAR{" "}
                            </span>
                          </button>
                        )}
                    </div>
                  </div>
                </ModalBody>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-xl font-semibold">
                    {" "}
                    No Items Added{" "}
                  </span>
                </div>
              )}
              <ModalFooter>
                {/* <Button
                className="bg-skin-lightBlue text-skin-darkBlue font-bold p-2 rounded-lg mt-5"
                mr={3}
                onClick={onClose}
              >
                No
              </Button>
              <Button
                variant="ghost"
                type="submit"
                className="bg-skin-lightRed font-bold p-2 rounded-lg mt-5"
              >
                Yes
              </Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </ChakraProvider>

        {cartItems.size > 0 && (
          <div className="absolute left-4 bottom-5">
            <span className="flex items-center justify-center rounded-full bg-skin-darkBlue text-white text-xs w-4 h-4">
              {cartItems.size}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
