import axios from "axios";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/products`
      );
      setAllProducts(data);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div className="my-6 space-y-4">
      {/* <div>
         <button className="btn mb-2 bg-orange-400 hover:text-white hover:bg-orange-500"
          onClick={()=>setAsc(!asc)}>
           {            asc? 'price: Descending Order' : "Price: Ascending Order"}
         </button>
        </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-12 my-10 ">
         {allProducts.map((product,index) => (
           <div key={index} className="card bg-base-100 w-96 shadow-xl">
           <figure>
             <img
               src={product.image}
               className="w-[300px] h-[300px]"
               alt="Shoes" />
           </figure>
           <div className="card-body">
             <h2 className="card-title">
               {product.name}
               <div className="badge badge-accent text-lg">  {product.price} $ </div>
             </h2>
             <p> {product.description} </p>
             <div className="card-actions ">
               <div>
              <span className="font-semibold text-lg"> Category:</span> <p className="badge font-medium "> {product.category} </p>
               </div>
             </div>
             <div className="card-actions ">
               <div>
               <span className="font-medium"> Ratings:</span> <p className="badge  bg-indigo-300"> {product.ratings} ⭐</p>
               </div>
             </div>
             <div className="card-actions  justify-end">
               <div>
               <span className="font-medium"> createdAt:</span> <p className=""> 🗓️ {product.createdAt}</p>
               </div>
             </div>
           </div>
         </div>
         ))}
       </div>
    </div>
  );
};

export default AllProducts;
