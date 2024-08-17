import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = async () => {
    await logOut();
    try {
      toast("Log Out Successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
      toast(err.message, {
        icon: '❌',
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  

 
  
 

  return (
    <div className="navbar bg-stone-500 bg-opacity-60 fixed z-10">
      <div className="navbar-start">
        
        <div className="hidden  md:flex gap-2  items-center ">
          <img
            src="https://i.postimg.cc/ZKNRspbN/7515257.jpg "
            className=" rounded-2xl w-[65px]"
            alt=""
          />
          <p className="text-xl md:text-2xl font-semibold">
            QuickCart
          </p>
        </div>
      </div>
      
      <div className="navbar-end">
        
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full" title={user?.displayName}>
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              
              <li className="mt-2">
                <button
                  onClick={handleLogOut}
                  className="bg-gray-200 block text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to={"/login"}>
              <button
                className="btn hover:text-white hover:bg-stone-500
               border-stone-500 mr-2 hover:border-0"
              >
                Login
              </button>
            </Link>
            <Link to={"/sign-up"}>
              <button
                className="btn hover:text-white hover:bg-stone-500
               border-stone-500 hover:border-0"
              >
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
