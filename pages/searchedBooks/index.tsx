import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Document from "../document";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import PendingBooksCard from "@/components/PendingBooksCard";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import CheckSession from "@/components/middleware/CheckSession";
import { useSession } from "next-auth/react";
import { Books } from "../../interfaces";
import GeneralSidebar from "@/components/GeneralSidebar";
import { useRouter } from "next/router";

const SearchedBooks = () => {
  const [progress, setProgress] = useState(0);
  const [issuedBooks, setissuedBooks] = useState<Books[]>([]);
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let { book } = router.query;


  useEffect(() => {
    if(book){
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/searchBooks`, {
        bookName : book,
        status: ["Issued","Borrowed"],
      })
      .then((res) => {
        setissuedBooks(res.data.books);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  }, [book]);


  return (
    <>
      {loading && <RingSpinnerOverlay color="#fe4a55" loading={loading} />}
      <Document />
      <Navbar />
      <LoadingBar
        color="#4287f5"
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {/* Filter Start */}
      {/* Filter End */}

      {/* Mobile Filter Start */}
      <GeneralSidebar title="Searched Items" />
  
      <CheckSession text={"Sign In to see details"} />
      {session && (
        <div className=" items-center">
             {issuedBooks && issuedBooks.length>0 ? issuedBooks.map((Book) => {
                 return (
                <div className="lg:ml-[300px] my-10 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:w-[calc(100%-350px)] align-middle">
              <div className="my-8 md:scale-75 md:my-0 lg:my-8 lg:scale-100 mx-auto">
                <div
                  onClick={() => {
                    setProgress(30);
                  }}
                >
                  <PendingBooksCard
                  isBorrow={Book.borrowRate ?  true : false}
                  status={Book.status}
                  _id={Book.id}
                  name={Book.title}
                  img={Book.photo}
                  price={Book.price}
                  condition={Book.condition}
                  authorName={Book.authorName}
                  borrowRate={Book.borrowRate}
                  />
                </div>
              </div>
          </div>
            );
          }) : (
            <div className="flex h-[100vh] w-full items-center justify-center">
                <p className="font-semibold text-lg">No Item found ...</p>
                </div>
          )} 
        </div>
      )}
    </>
  );
};

export default SearchedBooks;
