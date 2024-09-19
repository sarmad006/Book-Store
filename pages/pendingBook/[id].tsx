// URL: productdetailsdonate
import Document from "../document";
import Navbar from "@/components/Navbar";
import GeneralSidebar from "@/components/GeneralSidebar";
import Footer from "@/components/Footer";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PendingDetail from "@/components/BookDetails/PendingDetail";
import { toast } from "react-toastify";
import { Books } from "../../interfaces";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import CheckSession from "@/components/middleware/CheckSession";
import { useSession } from "next-auth/react";


interface BookDetails {
  books: Books[];
  name: String;
}

export default function BookDetails() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [BookDetails, setbookDetails] = useState<BookDetails>(undefined);
  const router = useRouter();

  let id = router.query.id;

  const handleAction = async (e: React.SyntheticEvent<HTMLFormElement>, comments:String, status:Boolean) => {
    setLoading(true)
    e.preventDefault();
    let body = {
      id,
      comments,
      status: status ? "Issued" : "Rejected",
      isComment:true
    };
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/BookStatusUpdate`,
        body
      );
      toast.success(
        `Item ${BookDetails.books[0].title} has been ${
          status ? "Issued" : "Rejected"
        }`,
        {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        }
      );
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   theme: "dark",
      // });
    }
    setTimeout(()=>{
        setLoading(false)
    },300)
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/books/BookbyId`, {
          id,
        })
        .then((res) => {
          setbookDetails(res.data.result);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }
  }, [id]);
  return (
    <>
      <CheckSession  text={'Sign In to see details'}/>
      {session && session.user.email.includes('admin') && (
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
      <GeneralSidebar title="Item Details" />
      <div className=" mr-6 lg:ml-[300px] my-10">
        {BookDetails && (
          <PendingDetail
            name={BookDetails.books[0].title}
            img={BookDetails.books[0].photo}
            description={BookDetails.books[0].description}
            author={BookDetails.books[0].authorName}
            condition={BookDetails.books[0].condition}
            price={BookDetails.books[0].price}
            donation={BookDetails.books[0].donation}
            borrowRate={BookDetails.books[0].borrowRate}
            category={BookDetails.books[0].category}
            userName={BookDetails.name}
            action={handleAction}
          />
        )}
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
