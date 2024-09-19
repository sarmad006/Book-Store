import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Document from "../document";
import { useDisclosure } from "@chakra-ui/hooks";
import Link from "next/link";
import LoadingBar from "react-top-loading-bar";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  ChakraProvider,
  RadioGroup,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import axios from "axios";
import PendingBooksCard from "@/components/PendingBooksCard";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import CheckSession from "@/components/middleware/CheckSession";
import { getSession, useSession } from "next-auth/react";
import Filters from "@/components/Filters";
import { Books, ReturnBook } from "../../interfaces";
import GeneralSidebar from "@/components/GeneralSidebar";
import ReturnBooksCard from "@/components/ReturnBooksCard";

const BorrowBooks = () => {
  const [progress, setProgress] = useState(0);
  const [issuedBooks, setissuedBooks] = useState<ReturnBook[]>([]);
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState("");

  const havesession = async () => {
    const fetchSession: any = await getSession();
    const fetchId = fetchSession?.user?.id;
    return fetchId;
  };
  // const [result, setResult] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  let id;


  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        id = await havesession();
        if(id){
        const res = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/borrowBooks`, {
          userId: id
        });
        
        setissuedBooks(res.data.borrowedBooks);
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    fetchData();
  }, [id]); 
  

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

    <GeneralSidebar title="Borrowed Books" />
      {/* Filter Start */}
      {/* <Filters borrow={true} status="Issued" handleSetBooks={handleSetBooks} /> */}
      {/* Filter End */}

      {/* Mobile Filter Start */}

      <>
        <ChakraProvider>
          <div className="lg:hidden block fixed bottom-6 right-6 z-50">
            <Button ref={btnRef} colorScheme="blue" onClick={onOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 pr-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filter
            </Button>
          </div>
          <Drawer
            isOpen={isOpen}
            placement="bottom"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />

              <DrawerBody>
                <>
                  <h1 className="text-5xl font-semibold py-10 font-rokkitt">
                    Filter
                  </h1>

                  {/* Condition Radio Button Start*/}
                  <div className="w-10/12 mx-auto">
                    <h2 className="text-left text-xl font-semibold  my-3">
                      Condition
                    </h2>
                    <div className="text-left   flex">
                      <ChakraProvider>
                        <RadioGroup
                          onChange={setCondition}
                          value={condition}
                          defaultValue="0"
                        >
                          <div className="flex items-center">
                            <input
                              id="4"
                              type="radio"
                              name="condition"
                              value={3}
                              className="mx-3 my-2"
                              onClick={(e) =>
                                setCondition(e.currentTarget.value)
                              }
                            ></input>
                            <label
                              htmlFor="4"
                              className="flex items-center text-lg"
                            >
                              4
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-yellow-400 mx-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              and above.
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="3"
                              type="radio"
                              name="condition"
                              value={2}
                              className="mx-3 my-2"
                              onClick={(e) =>
                                setCondition(e.currentTarget.value)
                              }
                            ></input>
                            <label
                              htmlFor="3"
                              className="flex items-center text-lg"
                            >
                              3
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-yellow-400 mx-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              and above.
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="2"
                              type="radio"
                              name="condition"
                              value={1}
                              className="mx-3 my-2"
                              onClick={(e) =>
                                setCondition(e.currentTarget.value)
                              }
                            ></input>
                            <label
                              htmlFor="2"
                              className="flex items-center text-lg"
                            >
                              2
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-yellow-400 mx-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              and above.
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="condition"
                              value={0}
                              id="All"
                              className="mx-3 my-2"
                              defaultChecked
                              onClick={(e) =>
                                setCondition(e.currentTarget.value)
                              }
                            ></input>
                            <label htmlFor="All" className="text-lg">
                              All Books
                            </label>
                          </div>
                        </RadioGroup>
                      </ChakraProvider>
                    </div>

                    {/* Condition Radio Button End*/}

                  
                  </div>
                  <div className="flex justify-between w-9/12 mx-auto">
                    <button className="bg-skin-lightRed text-skin-darkRed hover:bg-red-100 px-4 py-2 transition-all rounded-lg font-bold my-10 ">
                      Clear Filter
                    </button>
                    <button className=" bg-skin-lightBlue text-skin-darkBlue hover:bg-skin-hoverBlue px-4 py-2 transition-all rounded-lg font-bold my-10">
                      Search
                    </button>
                  </div>
                </>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </ChakraProvider>
      </>

      {/* Mobile Filter End */}
      <CheckSession text={"Sign In to see details"} />
      {session && (
        <div className=" items-center">
        <div className="lg:ml-[300px] my-10 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:w-[calc(100%-350px)] align-middle">
             {issuedBooks?.map((Book) => {
            return (
              <div className="my-8 md:scale-75 md:my-0 lg:my-8 lg:scale-100 mx-auto">
                <div
                  onClick={() => {
                    setProgress(30);
                  }}
                >
                   <ReturnBooksCard
                    isBorrow={true}
                    userId = {Book.userId}
                    timeLeft = {Book.borrowedAt.toString()}
                    status={Book.status}
                    _id={Book.book.id}
                    name={Book.book.title}
                    img={Book.book.photo}
                    price={Book.book.price}
                    condition={Book.book.condition}
                    authorName={Book.book.authorName}
                    borrowRate={Book.book.borrowRate}
                  />
                </div>
              </div>
            );
          })} 
          </div>
        </div>
      )}
    </>
  );
};

export default BorrowBooks;
