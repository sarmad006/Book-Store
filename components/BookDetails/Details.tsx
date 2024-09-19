import React from 'react'

const Details = (props) => {
    console.log("props",props)
  return (
    <div className="grid grid-cols-1 w-10/12 md:w-full mx-auto md:mx-0 xl:grid-cols-2">
    <div className="m-auto 2xl:w-8/12 xl:w-10/12 md:w-8/12 w-full p-4 py-10 bg-gray-100 drop-shadow-md rounded-2xl my-10">
      <div className="m-auto">
        <img
          src={props.props.img}
          alt="book-preview"
          className=" rounded-xl sm:h-[500px] m-auto shadow-xl"
        />
      </div>
    </div>

    <div className="xl:my-auto md:w-8/12 md:mx-auto xl:mx-0 mt-6 lg:my-12">
      <div className=" mb-2">
        <h1 className="text-4xl font-semibold">{props.props.name}</h1>
      </div>
      <div className="mb-6">
        <p>{props.props.description}</p>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold text-xl">Author</h2>
        <h3 className="text-xl">{props.props.author}</h3>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold text-xl">Category</h2>
        <h3 className="text-xl">{props.props.category}</h3>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold">Condition</h2>
        <h3 className="text-xl flex">
          {props.props.condition}{" "}
          <span className="my-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        </h3>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold">Issued By</h2>
        <p className="text-xl font-bold ">{props.props.userName}</p>
      </div>

      {props.props.donation ? (
        <div className="py-6">
          <h3 className="text-xl font-semibold text-skin-darkBlue">
            Applied for Donation
          </h3>
        </div>
      ) : (
        <>
          {props.props.price ? (
          <div className="mb-6">
            <h2 className="font-semibold">Price</h2>
            <p className="text-xl flex">QAR {props.props.price}</p>
          </div>
          ) :(
          <div className="mb-6">
            <h2 className="font-semibold">Borrow Rate (Daily)</h2>
            <p className="text-xl flex">{props.props.borrowRate ? "QAR " + props.props.borrowRate : "Not for Borrow"}</p>
          </div>
          )}
        </>
      )}
    </div>
  </div>
  )
}

export default Details