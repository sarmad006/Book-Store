// URL: productdetailsdonate
import Document from "../document";
import Navbar from "@/components/Navbar";
import GeneralSidebar from "@/components/GeneralSidebar";
import Footer from "@/components/Footer";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { Books } from "../../interfaces";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import CheckSession from "@/components/middleware/CheckSession";
import { useSession } from "next-auth/react";
import UserProfile from "@/components/UserProfile";


export default function UserDetails() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [UserDetails, setUserDetails] = useState(undefined);
  const router = useRouter();

  let id = router.query.id;

 
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/UserById`, {
          id,
        })
        .then((res) => {
          setUserDetails(res.data.result);
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
      {loading && <RingSpinnerOverlay color="#fe4a55" loading={loading} />}
      {session && (
        <>
      <Document />
      <Navbar />
      <LoadingBar
        color="#4287f5"
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <GeneralSidebar title="User Details" />
      <div className=" mr-6 lg:ml-[300px] my-10">
        <UserProfile UserDetails = {UserDetails}/>
      </div>
      <div className="lg:ml-[300px]"></div>
      <div className="lg:ml-[300px]">
        <Footer />
      </div>
      </> )}
      </>

  );
}
