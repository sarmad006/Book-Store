import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { LuDelete } from "react-icons/lu";
import { ChakraProvider, RadioGroup, Radio } from "@chakra-ui/react";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import axios from "axios";
import { toast } from "react-toastify";
import { Books } from "../interfaces";

interface fitersProps {
  status: string;
  borrow:Boolean;
  handleSetBooks: (val: Books[]) => void;
}
const Filters = ({ status,borrow=false, handleSetBooks }: fitersProps) => {
  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState("");
  const [category,setCategory] = useState("")

  let categoryList = [
    { label: "Physics", value: "Physics" },
    { label: "Chemistry", value: "Chemistry" },
    { label: "Biology", value: "Biology" },
    { label: "Mathematics", value: "Mathematics" },
    { label: "Arabic", value: "Arabic" },
    { label: "English", value: "English" },
    { label: "Children", value: "Children" },
    { label: "Islamic Studies", value: "Islamic Studies" },
    { label: "Social Studies", value: "Social Studies" },
    { label: "Other Languages", value: "Other Languages" },
  ];

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    try {
      let parameters : {status : string ,borrow: Boolean,condition? : string , category? : string} = {status,borrow}
       if(condition) parameters = {...parameters,condition}
       if (category) parameters = {...parameters,category}
      let result = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/getBooksFilter`,
        parameters
      );
      console.log("result", result);
      handleSetBooks(result.data.books);
    } catch (error) {
      console.log(error, error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleRemove = (e)=>{
    setCategory("")
    setCondition("")
  }
  return (
    <>
      {loading && <RingSpinnerOverlay color="#fe4a55" loading={loading} />}
      <ChakraProvider>
        <div className="w-[300px] text-center shadow-2xl h-[100vh] fixed hidden lg:block scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50 overflow-y-scroll">
          <h1 className="text-5xl font-semibold py-10">Filter</h1>
          {/* Condition Radio Button Start*/}

          <div className="w-10/12 mx-auto">
            <div className=" flex flex-col gap-y-1">
              <h2 className="text-left text-xl font-semibold ">Category</h2>
              <select
                onChange={(e)=>setCategory(e.target.value)}
                name="category"
                className="block w-full h-[40px] pl-2 mb-5"
                value={category}
              >
                <option value="">Select Category</option>
                {categoryList.map((c) => {
                  return <option value={c.value}>{c.label}</option>;
                })}
              </select>
            </div>
            <div>
              <h2 className="text-left text-xl font-semibold  my-3">
                Condition
              </h2>
              <div className="text-left   flex">
                <ChakraProvider>
                  <RadioGroup
                    value={condition}
                    onChange={(nextVal: string) => setCondition(nextVal)}
                  >
                    <div className="flex items-center">
                      <Radio name="condition" value={"5"} className="mx-3 my-2">
                        <label
                          htmlFor="4"
                          className="flex items-center text-lg"
                        >
                          5
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-400 mx-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          (New)
                        </label>
                      </Radio>
                    </div>
                    <div className="flex items-center">
                      <Radio name="condition" value={"4"} className="mx-3 my-2">
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
                          (Good)
                        </label>
                      </Radio>
                    </div>
                    <div className="flex items-center">
                      <Radio name="condition" value="3" className="mx-3 my-2">
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
                          (Average)
                        </label>
                      </Radio>
                    </div>
                    <div className="flex items-center">
                      <Radio name="condition" value={"2"} className="mx-3 my-2">
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
                          (Below Average)
                        </label>
                      </Radio>
                    </div>
                    {/* <div className="flex items-center">
                    <Radio name="condition" value="0" className="mx-3 my-2">
                      <label htmlFor="All" className="text-lg">
                        All Items
                      </label>
                    </Radio>
                  </div> */}
                  </RadioGroup>
                </ChakraProvider>
              </div>
            </div>

            <div className="flex justify-between mb-12 w-full">
              <button
                className="bg-skin-lightRed text-skin-darkRed hover:bg-red-100 px-3 py-2 transition-all rounded-lg font-bold my-10 inline-flex items-center gap-x-1"
                onClick={handleRemove}
              >
                <LuDelete fontSize={16} />
                <span>Clear Filter</span>
              </button>
              <button
                className=" bg-skin-lightBlue text-skin-darkBlue hover:bg-skin-hoverBlue px-3 py-2 transition-all rounded-lg font-bold my-10 inline-flex items-center gap-x-2"
                onClick={handleSearch}
              >
                <span> Search </span>
                <AiOutlineSearch />
              </button>
            </div>
          </div>
        </div>
      </ChakraProvider>
    </>
  );
};

export default Filters;
