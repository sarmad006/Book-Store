import Document from "./document"
import HomePageMain from "@/components/HomePageMain"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer";
import LoadingBar from 'react-top-loading-bar';
import { useState } from "react"


export default function Home() {

  const [progress, setProgress] = useState(0)

  const topLoader = () => {
    setProgress(30);
  }
  return (
    <>  
    <Document />
    <Navbar/>
    <LoadingBar
        color='#4287f5'
        height = {4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {/* <button onClick={topLoader}>click</button> */}
    <HomePageMain />


    {/* <NewlyAddedHome 
      topLoader = {topLoader}
    /> */}
    {/* <GetBooksHome 
    topLoader = {topLoader}
    /> */}
    {/* <TopFreeBooksHome 
    topLoader = {topLoader}
    /> */}
    {/* <TopStoryBooksHome 
      topLoader = {topLoader}
    /> */}
    {/* <DonateBottomHome 
      topLoader = {topLoader}
    /> */}
    <Footer />


    </>
  )
}


