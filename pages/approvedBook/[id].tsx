// URL: productdetailsdonate
import Document from "../document";
import Navbar from "@/components/Navbar";
import GeneralSidebar from "@/components/GeneralSidebar";
import Footer from "@/components/Footer";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ApprovedDetail from "@/components/BookDetails/ApprovedDetail";
import { toast } from "react-toastify";
import { Books } from "../../interfaces";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import CheckSession from "@/components/middleware/CheckSession";
import { useSession } from "next-auth/react";

interface BookDetails {
  books: Books[];
  name: String;
  email: String;
}

export default function ApprovedBookDetails() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [BookDetails, setbookDetails] = useState<BookDetails>(undefined);
  const router = useRouter();

  let id = router.query.id;

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
      <CheckSession text={"Sign In to see details"} />
      {session &&  (
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
              <ApprovedDetail
                id={BookDetails.books[0].id}
                name={BookDetails.books[0].title}
                img={BookDetails.books[0].photo}
                description={BookDetails.books[0].description}
                author={BookDetails.books[0].authorName}
                condition={BookDetails.books[0].condition}
                price={BookDetails.books[0].price}
                donation={BookDetails.books[0].donation}
                borrowRate={BookDetails.books[0].borrowRate}
                userName={BookDetails.name}
                status={BookDetails.books[0].status}
                userEmail={BookDetails.email}
                category = {BookDetails.books[0].category}
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
