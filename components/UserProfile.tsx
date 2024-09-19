import React from "react";
import { Avatar, ChakraProvider } from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const UserProfile = (props) => {
  const { data: session } = useSession();
  const mail = session?.user?.email;
  console.log("props", props);

  return (
    <>
      {/* //------------------------For Laptop Size-------------------------------------- */}
      <div className="hidden lg:block">
        <div className="h-96 w-full">
          <div
            className="  bg-Educational-bg"
            style={{
              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              background: "white",
            }}
          >
            <div className="w-full text-center items-center pt-14">
              <ChakraProvider>
                <Avatar
                  src={props.image}
                  borderRadius="100%"
                  size="2xl"
                ></Avatar>
              </ChakraProvider>
              {props.UserDetails && (
                <>
                  <h3 className="text-black text-xl font-semibold mt-3">
                    {props.UserDetails.name}
                  </h3>
                  {props.UserDetails.email && (
                    <>
                      <h4 className="text-black">{props.UserDetails.email}</h4>
                    </>
                  )}

                  {props.UserDetails.rewardPoints && (
                    <>
                      <p className="text-black py-4">
                        {" "}
                        Reward Points{" "}
                        <span className="text-skin-darkBlue font-bold"> {props.UserDetails.rewardPoints}</span>{" "}
                      </p>
                    </>
                  )}

                  <div className="flex justify-center my-6">
                    <p className="text-black text-md rounded-full my-1 mx-5 text-left">
                      Items Posted :{" "}
                      <span className="text-skin-darkBlue font-bold">
                        {props.UserDetails.books.length}
                      </span>
                    </p>

                    <p className="text-black text-md rounded-full my-1 mx-5 text-right">
                    Items Bought :{" "}
                      <span className="text-skin-darkBlue font-bold">
                        {
                          (props.UserDetails.books.length > 0
                            ? props.UserDetails.books.filter(
                                (book) => book.status === "Bought"
                              )
                            : []
                          ).length
                        }
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <p className="text-black text-md rounded-full my-1 mx-5 text-left">
                    Items Currently Borrowed :{" "}
                      <span className="text-skin-darkBlue font-bold">
                        {props.UserDetails.borrowedBooks.length}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* //------------------------For Mobile Size-------------------------------------- */}

      <div className="block lg:hidden h-auto">
        <div
          className=" bg-EducationM-bg"
          style={{
            height: "230px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="text-center">
            <ChakraProvider>
              <Avatar
                src={props.image}
                className="mt-5"
                borderRadius="100%"
                size="xl"
              >
                {mail === props.email && (
                  <>
                    {props.image ? (
                      <div className="cursor-pointer">
                        <Link
                          href={"/profile/[uid]/admin/edit"}
                          as={`/profile/${props.id}/admin/edit`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 bg-skin-lightBlue text-skin-darkBlue mt-20 -ml-7 rounded-2xl p-1"
                            viewBox="0 0 20 20"
                            onClick={() => {
                              try {
                                props.topLoader();
                              } catch {}
                            }}
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </Link>
                      </div>
                    ) : (
                      <div className="cursor-pointer">
                        <Link
                          href={"/profile/[uid]/admin/edit"}
                          as={`/profile/${props.id}/admin/edit`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-9 w-9 bg-skin-lightBlue text-skin-darkBlue mt-20 rounded-2xl p-2"
                            viewBox="0 0 20 20"
                            onClick={() => {
                              try {
                                props.topLoader();
                              } catch {}
                            }}
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </Avatar>
            </ChakraProvider>

            <h3 className="text-white text-xl font-semibold mt-1">
              {props.name}
            </h3>
            {mail === props.email && (
              <>
                <h4 className="text-white">{props.email}</h4>
              </>
            )}
            {mail != props.email && <></>}
            {session ? (
              <>
                {mail != props.email && (
                  <>
                    {props.college && (
                      <p className="text-white text-xs rounded-full my-1 mx-5">
                        Studying at {props.college}
                      </p>
                    )}
                    {props.school && (
                      <p className="text-white text-xs rounded-full my-1 mx-5">
                        Studying at {props.school}
                      </p>
                    )}
                    <Link
                      href={"/profile/[uid]/message"}
                      as={`/profile/${props.id}/message`}
                    >
                      <button
                        className="text-sm mt-0 text-center bg-skin-lightBlue text-skin-darkBlue p-2 px-6 rounded-3xl hover:bg-blue-100 font-semibold m-4 2xl:mx-2 transition-all"
                        onClick={() => {
                          try {
                            props.topLoader();
                          } catch {}
                        }}
                      >
                        Message
                      </button>
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                {mail != props.email && (
                  <>
                    {props.college && (
                      <p className="text-white text-xs rounded-full my-1 mx-5">
                        Studying at {props.college}
                      </p>
                    )}
                    {props.school && (
                      <p className="text-white text-xs rounded-full my-1 mx-5">
                        Studying at {props.school}
                      </p>
                    )}
                    <Link href={"/auth/signin"} as={`/auth/signin`}>
                      <button
                        className="text-sm text-center bg-gray-200 text-gray-900 p-2 px-6 rounded-3xl font-semibold m-4 2xl:mx-2 transition-all mt-0"
                        onClick={() => {
                          try {
                            props.topLoader();
                          } catch {}
                        }}
                      >
                        SignIn to Message
                      </button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
