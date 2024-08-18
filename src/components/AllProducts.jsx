import axios from "axios";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [timeasc, setTimeAsc] = useState("dsc");
  const [priceasc, setPriceAsc] = useState("dsc");

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}&search=${search}&timeSort=${
          timeasc ? "asc" : "dsc"
        }&priceSort=${
          priceasc ? "asc" : "dsc"
        }&  `
      );
      setAllProducts(data);
      //   console.log(data);
    };
    getData();
  }, [currentPage, itemsPerPage, search, timeasc,priceasc]);
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/products-count?search=${search}`
      );
      setCount(data.count);
      //   console.log(data);
    };
    getCount();
  }, [search]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  //  handle pagination button
  const handlePaginationButton = (value) => {
    console.log(value);
    setCurrentPage(value);
  };

  //   handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };
  console.log(search);

  return (
    <div className="my-10 space-y-4">
      <div>
        <form
          className=" flex justify-center items-center py-4"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            name="search"
            placeholder="enter "
            className="input bg-slate-100 input-bordered"
          />
          <input
            type="submit"
            value={"Search"}
            className="btn ml-1 bg-stone-500 text-white"
          />
        </form>
        <div className="flex justify-around items-center">
{/* sort */}
<div className="flex gap-3 justify-center items-center">
          <div className="text-center">
            <button
              className="btn mb-2 bg-stone-400  hover:text-white hover:bg-stone-700  "
              onClick={() => setTimeAsc(!timeasc)}
            >
              {timeasc ? "Oldest Products" : "Latest Products"}
            </button>
          </div>
          <div className="text-center">
            <button
              className="btn mb-2 bg-stone-400  hover:text-white hover:bg-stone-700 "
              onClick={() => setPriceAsc(!priceasc)}
            >
              {priceasc? " Price: Low to High " : " Price: High to Low"}
            </button>
          </div>
        </div>

{/* filter */}
<div>
            <select
            //   onChange={e => {
            //     setFilter(e.target.value)
            //     setCurrentPage(1)
            //   }}
            //   value={filter}
              name='category'
              id='category'
              className='border p-4 rounded-lg bg-stone-400 '
            >
              <option value='' disabled>Filter By </option>
              <option value='Web Development'>Brand Name</option>
              <option value='Graphics Design'>Category Name</option>
              <option value='Digital Marketing'>Price Range</option>
            </select>
          </div>


      </div>
        </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-12 my-10 ">
        {allProducts.map((product, index) => (
          <div key={index} className="card bg-base-100  shadow-xl">
            <figure>
              <img
                src={product.image}
                className="w-[300px] h-[300px]"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.name}
                <div className="badge badge-accent text-lg">
                  {" "}
                  {product.price} ${" "}
                </div>
              </h2>
              <p> {product.description} </p>
              <div className="card-actions ">
                <div>
                  <span className="font-semibold text-lg"> Category:</span>{" "}
                  <p className="badge font-medium "> {product.category} </p>
                </div>
              </div>
              <div className="card-actions ">
                <div>
                  <span className="font-medium"> Ratings:</span>{" "}
                  <p className="badge  bg-indigo-300"> {product.ratings} ⭐</p>
                </div>
              </div>
              <div className="card-actions  justify-end">
                <div>
                  <span className="font-medium"> CreatedAt:</span>{" "}
                  <p className=""> 🗓️ {product.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}

      <div className="flex justify-center pt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-stone-700  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? "bg-stone-700 text-white" : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-stone-700  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-stone-700 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
