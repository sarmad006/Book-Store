import { useState, useReducer, useEffect } from "react";
import Navbar from "@/components/Navbar";
import GeneralSidebar from "@/components/GeneralSidebar";
import Document from "../document";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Input,
  ChakraProvider,
  InputGroup,
  InputLeftElement,
  RadioGroup,
  Stack,
  Radio,
  InputRightElement,
} from "@chakra-ui/react";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { getSession } from "next-auth/react";
import LoadingBar from "react-top-loading-bar";
import { BiReset } from "react-icons/bi";
import { AiOutlineSave } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { postBook } from "../../interfaces";
import { formReducer } from "../../utils/hooks/formReducer";
import { useRouter } from "next/router";
import CheckSession from "@/components/middleware/CheckSession";

const initialFormState: postBook = {
  title: "",
  authorName: "",
  price: "",
  sellerId: "",
  description: "",
  photo: "",
  condition: "",
  donation: "1",
  borrowRate:"",
  category: '',
  Borrow:"0"
};
const ListBookForSelling = () => {
  const { data: session } = useSession();

  const [formDetails, setFormData] = useReducer(formReducer, initialFormState);

  let categoryList = [
    { label: 'Physics', value: 'Physics' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Biology', value: 'Biology' },
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'Arabic', value: 'Arabic' },
    { label: 'English', value: 'English' },
    { label: 'Children', value: 'Children' },
    { label: 'Islamic Studies', value: 'Islamic Studies' },
    { label: 'Social Studies', value: 'Social Studies' },
    { label: 'Other Languages', value: 'Other Languages' }
  ];
  
  

  const [progress, setProgress] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      type: "HANDLE INPUT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const router = useRouter()

  const [media, setMedia] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false); //useState for the loading dynamic animation

  ///Form Submit Function
  let remaining = 300 - formDetails.description.length;

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProgress(30);
    const id = await havesession();
    setLoading(true); //Showing Loading Animation
    const mediaUrl = await imgUpload(); //Getting the Image URL from the imgUpload function
    setProgress(50);
    let isDonated = formDetails.donation==="1" && formDetails.Borrow == "0"
    delete formDetails.Borrow
    let body = {
      ...formDetails,
      sellerId: id,
      photo: mediaUrl,
      donation: isDonated,
      status: session.user.email.includes("admin") ? "Issued" : "Pending",
    };
    console.log("body",body)
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/postBook`,
        body
      );
      toast.success(`Item ${formDetails.title} has been added`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      
    } catch (error) {
      console.log(error, error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
    setTimeout(() => {
      setProgress(100);
      handleReset();
      setLoading(false);
      router.push('/')
    }, 500);
  };

  const havesession = async () => {
    const fetchSession: any = await getSession();
    const fetchId = fetchSession?.user?.id;
    return fetchId;
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  //Upload Image Function using Coludinary

  const imgUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "bookImg");
    data.append("cloud_name", "qthrift");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/qthrift/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const img = await res.json();
    return img.url;
  };

  //Reset the form Function

  const handleReset = () => {
    setFormData({
      type: "EMPTY",
    });
    setSelectedFile(null);
  };

  return (
    <>
      <div>
        <Document />
        <Navbar />
        <LoadingBar
          color="#4287f5"
          height={4}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <GeneralSidebar title="List Your Item" />

        {/*//////////////////////////////////////////// When User is not Authenticated //////////////////////////////////// */}

        <CheckSession  text={'  Sign In to List Your Item for Selling'}/>

        {/*//////////////////////////////////////////// When User is Authenticated //////////////////////////////////// */}

        {session && (
          <form onSubmit={handleSubmit}>
            {/* ///////////////////////////////////Enter Book Details Below(first part)//////////////////////////////// */}
            <div className="mt-10 w-10/12 m-auto">
              <>
                <div className="ml-[0px] lg:ml-[300px] w-11/12 lg:w-[calc(100%-300px)] grid grid-col-1 md:grid-cols-2 lg:grid-cols-2 gap-0 md:gap-10">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">
                      Enter Item Details Below
                    </h1>
                    <p className="mb-5 text-sm text-red-600">
                      *All the fields are required.
                    </p>
                    <div className="my-3">
                      <h3>Item Name</h3>
                      <ChakraProvider>
                        <Input
                          type="text"
                          placeholder="Enter the Item Name"
                          className="w-[10vw] "
                          name="title"
                          value={formDetails.title}
                          onChange={handleChange}
                        />
                      </ChakraProvider>
                      <div className="my-5">
                        <h3>Author Name</h3>
                        <ChakraProvider>
                          <Input
                            type="text"
                            placeholder="Enter the Author Name"
                            name="authorName"
                            value={formDetails.authorName}
                            onChange={handleChange}
                          />
                        </ChakraProvider>
                      </div>
                      <div className="my-3">
                        <h3>Product Description</h3>
                        <textarea
                          className="w-full h-24 resize-none focus:ring-blue-400"
                          id="text-area"
                          placeholder="Enter Product Description"
                          name="description"
                          value={formDetails.description}
                          maxLength={300}
                          onChange={handleChange}
                        />
                        <p
                          className={
                            remaining == 0
                              ? "float-right text-xs text-red-600"
                              : "float-right text-xs text-opacity-50 "
                          }
                          id="remaining-char"
                        >
                          {remaining} characters remaining
                        </p>
                      </div>
                      { session.user.email.includes("admin") && (
                      <div className="">
                        <label> Available for Borrow </label>
                        <ChakraProvider>
                          <RadioGroup
                            name="Borrow"
                            value={formDetails.Borrow}
                            onChange={(nextVal:string) =>
                              setFormData({
                                type: "HANDLE INPUT",
                                field: "Borrow",
                                payload: nextVal
                              })
                            }
                            className="flex gap-x-28 items-center  w-full my-4"
                          >
                            <Radio value="1">Yes</Radio>
                            <Radio value="0">No</Radio>
                          </RadioGroup>
                        </ChakraProvider>
                      </div>
                      )}
                      {formDetails.Borrow == '0' && (
                      <div className="mt-6">
                        <label>List for Donation</label>
                        <ChakraProvider>
                          <RadioGroup
                            name="donation"
                            value={formDetails.donation}
                            onChange={(nextVal:string) =>
                              setFormData({
                                type: "HANDLE INPUT",
                                field: "donation",
                                payload: nextVal
                              })
                            }
                            className="flex gap-x-28 items-center  w-full my-4"
                          >
                            <Radio value="1">Yes</Radio>
                            <Radio value="0">No</Radio>
                          </RadioGroup>
                        </ChakraProvider>
                      </div>
                      )}
                      <div className="my-3 flex flex-col gap-y-2">
                        <label>Book Category</label>
                        <select
                        value={formDetails.category}
                        onChange={handleChange}
                        name="category"
                        className="block w-full h-[40px] pl-2 mb-5"
                      >
                        <option value="">Select Category</option>
                        {categoryList.map((c) => {
                          return (
                             <option value={c.value}>{c.label}</option>
                          )
                        }
                        )}
                      </select>
                      </div>
                    </div>
                  </div>
                  {/* ///////////////////////////////////Enter Book Details Below(last part)//////////////////////////////// */}
                  <div className="mt-0 md:mt-[50px]">
                    <div className="xl:pr-8">
                      <div className="hidden md:block mb-4 mt-5">
                        <img
                          src="/ListBookForSelling.svg"
                          className="w-[230px] h-[160px] mx-auto"
                        ></img>
                      </div>

                      <label>Overall Condition</label>
                      <select
                        value={formDetails.condition}
                        onChange={handleChange}
                        name="condition"
                        className="block w-full h-[40px] pl-2 mb-5"
                      >
                        <option value="">Enter Condition</option>
                        <option value="5">5 star (Almost New Condition)</option>
                        <option value="4">4 star (Good Condition)</option>
                        <option value="3">3 star (Average Condition)</option>
                        <option value="2">
                          2 star (Below Average Condition)
                        </option>
                        <option value="1">1 star (Poor Condition)</option>
                      </select>
                      {formDetails.donation === "0" && formDetails.Borrow == "0" && (
                        <div className={`${session.user.email.includes("admin") ? "mt-40" : "mt-20" } `}>
                          <div className="mb-5">
                            <h3> Price</h3>
                            <ChakraProvider>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  color="gray.300"
                                  fontSize="0.9em"
                                  children="QAR "
                                />
                                <Input
                                  name="price"
                                  type="number"
                                  value={formDetails.price}
                                  placeholder="Enter amount"
                                  onChange={handleChange}
                                />
                              </InputGroup>
                            </ChakraProvider>
                          </div>
                        </div>
                      )}

                      {formDetails.Borrow == "1" && (
                       <div className="mt-20">
                       <div className="mb-5">
                        <label>Borrow Rate</label>
                        <ChakraProvider>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  color="gray.300"
                                  fontSize="0.9em"
                                  children="QAR "
                                />
                                <Input
                                  name="borrowRate"
                                  type="number"
                                  value={formDetails.borrowRate}
                                  placeholder="Enter amount"
                                  onChange={handleChange}
                                />
                                <InputRightElement className="text-xs text-gray-400 items-center mx-4">Daily</InputRightElement>
                              </InputGroup>
                            </ChakraProvider>
                      </div>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* /////////<///////////////////////////After Grid////////////////////////////////////////// */}

                <div className="mt-5 mx-auto">
                  <div className="ml-[0px] lg:ml-[300px] w-11/12 lg:w-[calc(100%-300px)]">
                    <label className="block text-sm font-medium text-gray-700">
                      Add Product Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {selectedFile ? (
                          <img
                            src={selectedFile}
                            alt=""
                            className="w-60 mx-auto my-3"
                          />
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-skin-darkBlue hover:text-skin-darkBlue  focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-bg-skin-lightBlue"
                          >
                            <span className="hover:underline transition-all">
                              Upload a photo
                            </span>
                          </label>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only "
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => {
                              setMedia(e.target.files[0]);
                              addImageToPost(e);
                            }}
                          />

                          {/* Showing the Uploaded File name */}

                          <span className="ml-2">
                            {media.name} {!media.name && "No Photo Selected"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 2MB
                        </p>
                      </div>
                    </div>
                    <div className="flex my-5 w-full justify-between">
                      <button
                        type="reset"
                        className="bg-lightRed text-md tracking-wider font-bold mt-4 w-2/12 px-4 text-white py-3 rounded-md shadow-xl focus:outline-none inline-flex items-center justify-center gap-x-4"
                        onClick={handleReset}
                      >
                        <BiReset fontSize={20} />
                        <span> Reset</span>
                      </button>
                      <button
                        type="submit"
                        className="bg-skin-darkBlue text-md tracking-wider font-bold mt-4  text-white  w-2/12 py-3 rounded-md shadow-xl focus:outline-none inline-flex items-center justify-center gap-x-4"
                      >
                        <span>Submit</span>
                        <AiOutlineSave fontSize={20} />
                      </button>

                      {/* Showing the Spinner Conditionally */}

                      {loading ? (
                        <RingSpinnerOverlay color="#fe4a55" loading={loading} />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ListBookForSelling;
