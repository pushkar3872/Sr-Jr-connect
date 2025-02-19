// import { useAuthStore } from "../store/useAuthStore"
import { LogOut, MessageCircle, Settings, User, UserRoundSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthstore } from "../store/useAuthstore";
import { useEffect, useRef, useState } from "react";
const Navbar = () => {
  const { authUser, logout } = useAuthstore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className=" border-b border-base-300 fixed w-full tpo-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-12 ">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className=" flex items-center gap-2.5 hover:opacity-80 transition-all" >
              <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Sr-Jr</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm transition-colors"
            >
              <Settings className="size-5" />
              <span >Setting</span>
            </Link>

            {
              authUser &&
              (
                <>
                  {/* <Link
                    to={"/profile"}
                    className={`btn btn-sm gap-2 transition-colors`}
                  >
                    <User className="size-5" />
                    <span className="hidden "></span>
                  </Link> */}
                  <Link
                    to="/teammate"
                    className="btn btn-sm gap-2 transition-colors"
                  >
                    <UserRoundSearch className="size-5" />
                    <span>Find Team</span>
                  </Link>

                  {/* <button className="btn btn-sm gap-2 transition-all" onClick={logout} >
                    <LogOut className="size-5" />
                    <span className="hidden "></span>
                  </button> */}

                  {/* Profile avatar */}
                  <button
                    onClick={() => setOpen(!open)}
                    className="avatar hover:cursor-pointer"
                  >
                    <div className="w-9 rounded-full">
                      <img src="avatar.png" alt="User" />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {open && (
                    <div ref={dropdownRef} className="dropdown-content absolute top-10 right-2.5 mt-2 w-48 bg-base-100 shadow-lg rounded-lg border border-base-300">
                      {/* Profile Section */}
                      <div className="p-4 flex flex-col items-center border-b border-base-300">
                        <img className="w-16 h-16 rounded-full object-cover" src="avatar.png" alt="Profile" />
                        <p className="mt-2 text-md font-bold">Shubham</p>
                      </div>

                      {/* Menu Items */}
                      <ul className="menu p-2 flex-col items-center">
                        <li>
                          <Link to="/profile" className="flex items-center gap-2">
                            <User className="size-5" />
                            Profile
                          </Link>
                        </li>
                        <li>
                          <button onClick={logout} className="flex items-center gap-2">
                            <LogOut className="size-5" />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>

                  )}
                </>
              )
            }

          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar