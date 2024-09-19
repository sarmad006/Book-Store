import React, { useContext, useState,useEffect } from "react";
import Details from "./Details";
import { CartContext } from "@/Context/cartContext";
import { handleCartItems } from "../../utils/CartHandle";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { useRouter } from "next/router";
import { Textarea } from "@chakra-ui/react";
import CommentSection from "../Comments/commentSection";

const ApprovedDetail = (props : any) => {
  const { cartItems, setcartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [isReserved,setReserved]=useState(false)
  const [borrowedBook,setBorrowBook]=useState<any>([])
  const router = useRouter();

  useEffect(() => {
    if (props && props.status == 'Borrowed') {
      setLoading(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/BorrowBookbyId`, {
         id : props.id,
        })
        .then((res) => {
          console.log("res",res.data)
          setBorrowBook(res.data.books)
          if(res.data.books.reserveUserId){
            setReserved(true)
          }
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }
  }, []);

  const { data: session } = useSession();
  const handleBuy = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    let tempMap = handleCartItems(props.id, props, cartItems, "Add");
    setcartItems(tempMap);
  };
  const havesession = async () => {
    const fetchSession: any = await getSession();
    const fetchId = fetchSession?.user?.id;
    return fetchId;
  };
  const handleBorrow = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    try {
      setLoading(true);
      let userId = await havesession();
      if(props.status == 'Borrowed' && !isReserved){
        await axios.post(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/BorrowBookStatusUpdate`,
          {
            id: borrowedBook.id,
            userId:userId
          }
        );
      }
      else {
      let borrowBook = {
        bookId: props.id,
        userId: userId,
        status: "Borrowed",
        borrowedAt: new Date(),
      };
      let books = [
        {
          bookId: props.id,
          status: "Borrowed",
        },
      ];
      console.log("Books", books, borrowBook);
      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/BookStatusUpdate`,
        {
          isComment: false,
          bookIdsWithStatus: books,
        }
      );
      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/postBorrowBook`,
        borrowBook
      );
      toast.success(`Item ${props.name} has been successfully borrowed`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }
     catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      router.push("/borrowBooks");
      setLoading(false);
    }, 500);
  };
  return (
    <>
      <Details props={props} />
      <div className="w-full mt-6 px-24">
        <h3 className="text-2xl font-semibold border-b-4 border-lightRed">
          USER DETAILS
        </h3>
        <div className="flex flex-col gap-y-4 py-8">
          <div className="w-full flex items-center gap-x-6">
            <label className="font-bold text-lg">Name :</label>
            <p>{props.userName}</p>
          </div>
          <div className="w-full flex items-center gap-x-6">
            <label className="font-bold text-md ">
              You can reach him/her at :
            </label>
            <a
              href={`mailto:${props.userEmail}`}
              className="border-b-2 border-gray-200 text-blue-600 cursor-pointer"
            >
              {props.userEmail}
            </a>
          </div>
        </div>
          

        {/* {props.donation && (
          <p className="text-center border-b-2 border-skin-darkBlue py-1 text-md font-medium">
            This Book is available free as it has been donated to Qthrift
          </p>
        )} */}

        <div className="flex justify-between gap-x-4">
          {(props.price || props.donation) &&
            session.user.name.toLowerCase() != "admin" && (
              <button
                onClick={handleBuy}
                className=" bg-skin-darkBlue text-md tracking-wider font-bold mt-4 w-2/12  text-white py-3 rounded-md shadow-xl focus:outline-none inline-flex items-center justify-center gap-x-1"
              >
                Get the Item
              </button>
            )}
        


          {(props.borrowRate  ) &&
            session.user.name.toLowerCase() != "admin" && (
              <button
                disabled={props.status == 'Borrowed' && isReserved }
                title={props.status == 'Borrowed'  ? "Currently unavailable" : ""}
                onClick={handleBorrow}
                className=" bg-lightRed text-md tracking-wider font-bold mt-4 w-2/12  text-white py-3 rounded-md shadow-xl focus:outline-none inline-flex items-center justify-center gap-x-1 disabled:bg-red-300 disabled:cursor-not-allowed"
              >
                {!isReserved && props.status == 'Borrowed' ? "Reserve" : "Borrow"}
              </button>
            )}

          {loading ? (
            <RingSpinnerOverlay color="#fe4a55" loading={loading} />
          ) : (
            <></>
          )}

          {/* {props.donation && session.user.name.toLowerCase()!='admin' && (
           <button
           onClick={handleBuy}
           className=" bg-skin-darkBlue text-md tracking-wider font-bold mt-4 w-2/12  text-white py-3 rounded-md shadow-xl focus:outline-none inline-flex items-center justify-center gap-x-1"
         >
           Get the Book
         </button>
        )} */}
        </div>
      </div>
    </>
  );
};

export default ApprovedDetail;
