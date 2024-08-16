import { Link } from "react-router-dom";

const Navber = () => {
    return (
        <div className="navbar fixed z-10  bg-opacity-60  bg-stone-500 ">
        <div className="navbar-start">
         <img src="https://i.postimg.cc/k4YVdLXG/7515257.jpg" className="w-[60px] h-[60px] rounded-lg" alt=""  />
          <a className="btn btn-ghost text-xl">QuickCart</a>
        </div>
       
        <div className="navbar-end">
        <Link><button className="btn">Sign In</button></Link>
        <Link><button className="btn mx-4">Sign Up</button></Link>
        
        </div>
      </div>
    );
};

export default Navber;