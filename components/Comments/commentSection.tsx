import {
  Avatar,
  ChakraProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";

const CommentSection = (props) => {
  console.log("props in comment", props);
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const havesession = async () => {
    const fetchSession: any = await getSession();
    const fetchId = fetchSession?.user?.id;
    return fetchId;
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" }); // Convert month number to month name
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/fetchComments`)
      .then((res) => {
        setComments(res.data.bookComment);
      });
  }, []);
  const handleSubmit = async (e) => {
    setComments([
      ...comments,
      {
        user: {
          name: session.user.name,
        },
        createdAt: new Date(),
        comment: commentText,
      },
    ]);
    e.preventDefault();
    await axios.post(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/AddComment`,
      {
        comment: commentText,
        userId: await havesession(),
      }
    );
    setCommentText("");
  };
  return (
    <div className="mx-1 mt-2">
      <div className="relative">
        <ChakraProvider>
          <button onClick={onOpen} className="text-2xl font-bold">
            <IoChatbubbleOutline />
          </button>
          <Modal
            scrollBehavior={"inside"}
            size={"xl"}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className="text-skin-darkBlue text-3xl font-semibold">
                Chat Room
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <section className="bg-white-500">
                  <div className="max-w-full pb-8 px-4">
                    {comments.map((comment) => (
                      <article className="text-base text-black rounded-lg mb-2 ">
                        <footer className="flex justify-between items-center ">
                          <div className="flex items-center gap-x-1">
                            <div className="h-12 w-12">
                              <ChakraProvider>
                                <Avatar
                                  name={comment?.user.name}
                                  src={comment?.user?.image}
                                  borderRadius="100%"
                                />
                              </ChakraProvider>
                            </div>
                            <p className="mx-3 text-md font-semibold">
                              {comment?.user.name}
                            </p>
                            <p className="text-sm ">
                              <time title="February 8th, 2022">
                                {formatDate(comment.createdAt)}
                              </time>
                            </p>
                          </div>
                        </footer>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl mx-12">
                          <p className="text-sm font-normal text-gray-900">
                            {" "}
                            {comment.comment}
                          </p>
                        </div>
                        <span className="text-sm font-normal text-gray-500 mx-14">
                          Delivered
                        </span>
                      </article>
                    ))}
                  </div>
                  <form className="mb-6">
                    <div className="w-full flex flex-col gap-y-2">
                      <label className="sr-only">Message</label>
                      <Textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full"
                        placeholder="Your Message..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <button
                        onClick={handleSubmit}
                        className=" bg-skin-darkBlue text-sm tracking-wider font-semibold mt-4 w-full px-6  text-white py-3 rounded-md shadow-xl focus:outline-none inline-flex items-center justify-center gap-x-1"
                      >
                        Add Message
                      </button>
                    </div>
                  </form>
                </section>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </ChakraProvider>
      </div>
    </div>
  );
};

export default CommentSection;
