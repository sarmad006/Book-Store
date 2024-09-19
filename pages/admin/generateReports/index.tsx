import Navbar from "@/components/Navbar";
import GeneralSidebar from "@/components/GeneralSidebar";
import Footer from "@/components/Footer";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import axios from "axios";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import CheckSession from "@/components/middleware/CheckSession";
import { FiChevronDown } from "react-icons/fi";
import { useSession } from "next-auth/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  TableCaption,
  TableContainer,
  ChakraProvider,
} from "@chakra-ui/react";
import { jsPDF } from "jspdf";

interface BookDetails {
  books: any[];
  name: String;
  email: String;
}

export default function GenerateReports() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const checkThreshold = (dateString, opt) => {
    const givenDate = new Date(dateString);
    let days = opt == "Yearly" ? 365 : opt == "Monthly" ? 30 : 7;

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference between the two dates in milliseconds
    const differenceInTime = currentDate.getTime() - givenDate.getTime();

    // Calculate the number of milliseconds in a week
    const milliseconds = days * 24 * 60 * 60 * 1000;
    return differenceInTime <= milliseconds;
  };

  const handleGenerate = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    user: any,
    str: string
  ) => {
    console.log("user", user);
    let caption =
      str == "Yearly" ? "Yearly" : str == "Monthly" ? "Monthly" : "Weekly";
    let DonatedBooks =
      user.books.length > 0
        ? user.books.filter(
            (book) =>
              book.status === "donation" && checkThreshold(book.createdAt, str)
          )
        : [];
    let soldBooks =
      user.books.length > 0
        ? user.books.filter(
            (book) =>
              book.status === "Bought" && checkThreshold(book.createdAt, str)
          )
        : [];
    const doc = new jsPDF();
    doc.setFontSize(32);
    doc.setFont("__Nunito_3dc409", "", "500");
    doc.text(`${user.name} ${caption} Report`, 100, 100, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Items Posted : ${user.books.length}`, 20, 120);
    doc.text(`Items Donated : ${DonatedBooks.length}`, 120, 120);
    doc.text(`Items Sold : ${soldBooks.length}`, 20, 130);
    doc.save(`${user.name} ${caption} Report.pdf`);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/usersList`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, []);

  return (
    <>
      <CheckSession text={"Sign In to see details"} />
      {session && (
        <>
          {loading && <RingSpinnerOverlay color="#fe4a55" loading={loading} />}
          <Navbar />
          <LoadingBar
            color="#4287f5"
            height={4}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <GeneralSidebar title="Generate Report" />
          <div className="flex flex-col justify-center items-start gap-y-6 h-96 w-full ">
            <h3 className="text-xl w-8/12 py-2 uppercase mx-96 text-skin-darkBlue font-semibold border-b-2 border-red-600">
              Users List
            </h3>
            <ChakraProvider>
              <TableContainer
                className="w-11/12 pl-96"
              >
                <Table>
                  <Thead>
                    <Tr>
                      <Th className="text-xl">User No</Th>
                      <Th className="text-xl">Name</Th>
                      <Th className="text-xl">Items</Th>
                      <Th className="text-xl">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users.length > 0 &&
                      users.map((user, index) => {
                        return (
                          <Tr className="rounded-md">
                            <Td className="text-left">{index + 1}</Td>
                            <Td className="text-left">{user.name}</Td>
                            <Td className="text-left">{user.books.length}</Td>
                            <Td>
                              <Menu>
                                <MenuButton
                                  onClick={(e) => {
                                    console.log("e", e);
                                  }}
                                  as={Button}
                                  rightIcon={<FiChevronDown />}
                                  className=" text-skin-darkBlue bg-transparent py-2 px-6  font-bold transition-all"
                                >
                                  Generate Report
                                </MenuButton>
                                <MenuList className="bg-white text-black px-2 py-2 rounded-md">
                                  <MenuItem
                                    onClick={(e) =>
                                      handleGenerate(e, user, "Yearly")
                                    }
                                    className="p-1 hover:bg-skin-lightBlue transition-all rounded font-semibold text-center"
                                  >
                                    Yearly
                                  </MenuItem>
                                  <MenuItem
                                    onClick={(e) =>
                                      handleGenerate(e, user, "Monthly")
                                    }
                                    className="p-1 hover:bg-skin-lightBlue transition-all rounded font-semibold text-center"
                                  >
                                    Monthly
                                  </MenuItem>
                                  <MenuItem
                                    onClick={(e) =>
                                      handleGenerate(e, user, "Weekly")
                                    }
                                    className="p-1 hover:bg-skin-lightBlue transition-all rounded font-semibold text-center"
                                  >
                                    Weekly
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                              {/* <button
                                onClick={(e) => handleGenerate(e, user)}
                                className="text-skin-darkBlue font-semibold text-md"
                              >
                                
                              </button> */}
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </ChakraProvider>
          </div>
          <div className="lg:ml-[300px]"></div>
          <div className="lg:ml-[300px]">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
