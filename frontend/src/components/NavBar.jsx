import { LogOut, MessageCircle, Settings, User, UserRoundSearch, UsersRound, Menu, Bell, X, Home, Briefcase, Calendar, Award, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthstore } from "../store/useAuthstore";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { authUser, logout } = useAuthstore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close sidebar when route changes (mobile navigation)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // Close sidebar if screen size becomes larger than sm
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { // 640px is the default Tailwind sm breakpoint
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if route is active for sidebar highlighting
  const isActive = (path) => {
    const active = location.pathname === path;
    return active
      ? "bg-primary text-primary-content font-medium"
      : "hover:bg-base-300 hover:text-base-content text-base-content/80";
  };

  // Menu items for sidebar and desktop navigation
  const menuItems = [
    { path: "/", icon: <Home className="size-5" />, label: "Dashboard" },
    { path: "/connections", icon: <UsersRound className="size-5" />, label: "Connections" },
    { path: "/teammate", icon: <UserRoundSearch className="size-5" />, label: "Find Team" },
    // { path: "/messages", icon: <MessageCircle className="size-5" />, label: "Messages" },
    // { path: "/projects", icon: <Briefcase className="size-5" />, label: "Projects" },
    // { path: "/events", icon: <Calendar className="size-5" />, label: "Events" },
    // { path: "/learning", icon: <BookOpen className="size-5" />, label: "Learning" },
    // { path: "/achievements", icon: <Award className="size-5" />, label: "Achievements" },
  ];

  return (
    <>
      <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-sm bg-base-100/80 shadow-md">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button - Left side */}
            <button
              className="sm:hidden p-2 hover:bg-base-200 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="size-6" />
            </button>

            <Link to="/" className="hidden sm:inline-flex items-center gap-2.5 hover:opacity-80 transition-all">
              <svg
                fill="currentColor"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="256px"
                height="600px"
                viewBox="0 0 795.601 795.601"
                className="mx-auto size-10 md:size-14 lg:size-14"
              >
                <g>
                  <g>
                    <path d="M569,551.9L569,551.9L569,551.9c-0.2-1.6-0.6-3.199-1.1-4.6c-3.8-14.5-12.4-40.9-16.3-52.7c-0.4-2.1-1.101-4-2-5.899 V488.6l0,0c-2.4-5.1-6.301-9.399-11.101-12.3l0,0c-0.3-0.2-0.899-0.5-1.7-0.9c-0.3-0.199-0.699-0.3-1-0.5 c-9.5-4.5-38.6-16.1-38.6-16.1l0,0c-14.6-6.3-29.6-11.7-45-17.1l0,0l0,0l0,0l0,0c-2.7,11.399-28.8,87.3-33,97.8l-3.3-70.5 c1.1-1.7,1.899-3.601,2.7-5.4l10.899-21.5c-7.7,6.4-19.1,10.4-32,10.4c-12.5,0-23.8-3.9-31.399-10l10.6,21.1 c0.9,1.8,1.6,3.7,2.7,5.4l-3.3,70.5c-4.101-10.5-30.2-86.4-33-97.8l0,0l0,0l0,0l0,0c-15.4,5.5-30.5,10.899-45,17.1l0,0 c0,0-29.1,11.6-38.6,16.1c-0.3,0.2-0.7,0.301-1,0.5c-0.8,0.4-1.4,0.7-1.7,0.9l0,0c-4.8,2.9-8.7,7.2-11.1,12.3l0,0c0,0,0,0,0,0.101 c-0.9,1.899-1.5,3.899-2,5.899c-3.9,11.8-12.5,38.2-16.3,52.7c-0.5,1.5-0.9,3-1.1,4.6l0,0l0,0c-0.2,1.4-0.3,2.801-0.3,4.301 c0,15.5,12.6,28.1,28.1,28.1h287c15.5,0,28.1-12.6,28.1-28.1C569.4,554.701,569.2,553.3,569,551.9z"></path>
                    <path d="M471.101,311.1c0-5,1-23,1-27.1c0-40.2-32.601-72.7-72.7-72.7l0,0l0,0H399.3h-0.1l0,0l0,0c-0.5,0-0.9,0-1.4,0 s-0.899,0-1.399,0l0,0l0,0H396.3h-0.1l0,0l0,0c-40.2,0-72.7,32.6-72.7,72.7c0,4.1,1,22.1,1,27.1c-1.8,0.1-18-3.8-16.3,15.7 c3.7,41.4,19.5,33.3,19.9,33.3c7.8,24.9,19.8,40.8,31.6,51c18.4,15.8,36.3,17.5,36.6,17.5c0.5,0,1,0,1.5,0l0,0l0,0 c0.5,0,1,0,1.5,0c0.301,0,18.101-1.7,36.4-17.3c11.9-10.1,24-26.1,31.8-51.1c0.5,0,16.2,8,19.9-33.3 C489.101,307.3,472.9,311.2,471.101,311.1z"></path>
                    <path d="M203.4,550.4c0.1-1.1,0.5-3.199,0.7-4.3c0.3-1.8,0.9-3.5,1.4-5.3c4.3-14.4,11.6-38.5,16.2-52.4c0.7-2.8,1.6-5.6,2.8-8.3 l3.1-8.899c-10-4-20.2-7.7-30.6-11.4l0,0c-2.4,10-25.1,76.1-28.7,85.3l-2.9-61.5c1-1.5,1.6-3.1,2.4-4.7l9.5-18.8 c-6.7,5.601-16.7,9.101-27.9,9.101c-10.9,0-20.7-3.4-27.4-8.7l9.3,18.399c0.8,1.601,1.4,3.2,2.4,4.7l-2.9,61.5 c-3.6-9.2-26.4-75.3-28.7-85.3l0,0c-13.4,4.8-26.6,9.5-39.2,14.9l0,0c0,0-25.4,10.199-33.6,14c-0.3,0.1-0.6,0.3-0.9,0.399 c-0.7,0.4-1.2,0.601-1.5,0.8l0,0c-4.2,2.5-7.6,6.301-9.7,10.7l0,0c0,0,0,0,0,0.101c-0.8,1.6-1.3,3.399-1.7,5.199 c-3.4,10.301-10.9,33.301-14.2,45.9c-0.4,1.3-0.8,2.7-1,4l0,0l0,0C0.1,557,0,558.3,0,559.5C0,573,11,584,24.5,584h23.4 c33.5,0,67,0,100.4,0c0.4,0,0.9,0,1.3,0s0.9,0,1.3,0c20.2,0,40.5,0,60.7,0c-5.3-8.101-8.5-17.7-8.5-28.101 C203.1,554.3,203.1,552.3,203.4,550.4z"></path>
                    <path d="M88.7,388.9c6.8,21.7,17.3,35.6,27.6,44.4c16.1,13.8,31.7,15.3,31.9,15.3c0.4,0,0.9,0,1.3,0c0.4,0,0.9,0,1.3,0 c0.3,0,15.7-1.5,31.7-15.1c10.4-8.8,20.9-22.7,27.8-44.6c0.4,0,14.2,7,17.4-29.1c1.5-17-12.7-13.6-14.2-13.7 c0-4.3,0.8-20,0.8-23.6c0-35-28.4-63.4-63.4-63.4l0,0h-0.1h-0.1l0,0l0,0c-0.4,0-0.8,0-1.2,0c-0.4,0-0.8,0-1.2,0l0,0l0,0h-0.1h-0.1 l0,0l0,0c-35,0-63.4,28.4-63.4,63.4c0,3.6,0.9,19.3,0.9,23.6c-1.5,0.1-15.7-3.3-14.2,13.7C74.5,395.8,88.3,388.9,88.7,388.9z"></path>
                    <path d="M795.101,535.1c-0.2-2.3-0.5-4.6-0.801-6.8c0,0-1.3-7.4-1.6-8.5c-2.9-12.9-11-22.4-21.9-29.8c-2-1.4-4.1-2.601-6.3-3.7 c-2.8-1.5-45.399-15.5-46.5-15.8c0.3,1.5,0.4,3.1,0.5,4.8c5.9,4.2,23.4,19.2,15.5,47.3c0,0-12.5-14.899-25.3-16.899 c-12.2,21.199-32.9,48.1-44.1,55.199c-11.2-7.1-31.9-33.899-44.101-55.199c-12.8,1.899-25.3,16.899-25.3,16.899 c-7.9-28.1,9.5-43.1,15.5-47.3c0.1-1.7,0.2-3.4,0.5-4.8c-0.8,0.3-25.9,8.5-38.9,13c0.601,1.6,1.101,3.3,1.5,4.899 c4.601,13.9,12.4,37.9,16.2,52.4c0.2,0.6,1.7,7.2,2.101,9.6c0.3,1.9,0.3,3.9,0.3,5.801c0,10.399-3.101,20-8.5,28.1 c26.899,0,53.8,0,80.8,0c32.8,0,65.6,0,98.4,0c9.8,0,18.1-3,25-10.3c5.399-5.7,6.899-12.601,7.3-20c0.1-1.3,0.2-6.9,0.2-6.9 S795.101,535.201,795.101,535.1z"></path>
                    <path d="M587.4,401.3c1,3.7,1.7,7.1,1.6,10.4c0,1.1-0.1,2.199-0.3,3.199c-0.9,3.101-7.5,13.601-8.5,15.4 c11.6,12.5,26.8,15.3,41.9,18.5c4.5,0.9,9,1.5,13.8,2.1c1.6,0.301,3.1,0.601,4.7,0.9l-7.7,22.4c0,0-0.2,32.699,31.399,52.6h0.2 c31.601-19.9,31.4-52.6,31.4-52.6l-7.7-22.4c1.6-0.3,3.2-0.6,4.7-0.9c4.8-0.6,9.399-1.199,13.8-2.1c15.1-3.2,30.4-6.1,41.9-18.5 c-1-1.8-7.601-12.2-8.5-15.4c-0.2-1.1-0.301-2.1-0.301-3.199c0-3.301,0.601-6.801,1.601-10.4c1-3.5,2.1-7,3.1-10.5 c5.101-11.4,8-24,8-37.3c0-49.5-39.3-89.7-88.2-90.6l0,0h-0.1h-0.1l0,0c-48.9,0.9-88.2,41.1-88.2,90.6c0,13.3,2.8,25.9,8,37.3 C585.4,394.4,586.5,397.8,587.4,401.3z"></path>
                  </g>
                </g>
              </svg>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sr-Jr</h1>
            </Link>
          </div>

          {/* Desktop Navigation  */}

          {
            authUser && (<div className="hidden sm:flex items-center space-x-1 bg-base-200/50 rounded-full p-1 border border-base-300">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center py-2 px-3 hover: rounded-full transition-all duration-200 ${isActive(item.path)}`}
                >
                  {item.icon}
                  <span className="ml-2 hidden lg:block">{item.label}</span>
                </Link>
              ))}
            </div>)
          }

          <div className="flex items-center gap-3">
            {/* Settings button */}
            <Link to="/settings" className="btn btn-circle btn-ghost">
              <Settings className="size-5" />
            </Link>

            {/* Notification button */}
            {
              authUser &&
              (
                <button className="btn btn-circle btn-ghost indicator">
                  <Bell className="size-5" />
                  <span className="indicator-item badge badge-xs badge-primary"></span>
                </button>

              )
            }

            {/* Profile Button - Always visible on mobile and desktop */}
            {authUser && (
              <>
                <button onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                }} className="avatar hover:cursor-pointer">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={authUser.profilePicture || "/avatar.png"} alt="User" />
                  </div>
                </button>

                {/* Dropdown Menu - Improved with Animation */}
                {profileDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-16 right-4 mt-2 w-64 bg-base-100 shadow-xl rounded-xl border border-base-300 z-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300"
                  >
                    <div className="p-6 flex flex-col items-center border-b border-base-300">
                      <img className="w-20 h-20 rounded-full object-cover ring-2 ring-primary ring-offset-2" src={authUser.profilePicture || "/avatar.png"} alt="Profile" />
                      <p className="mt-3 text-lg font-bold">{authUser.fullName}</p>
                      <p className="text-sm text-base-content/70">{authUser.role || "Developer"}</p>
                    </div>
                    <div className="p-3">
                      <Link to="/profile" className="flex items-center p-3 rounded-lg hover:bg-base-200 transition-colors">
                        <User className="size-5" />
                        <span className="ml-3 font-medium">View Profile</span>
                      </Link>
                      <Link to="/settings" className="flex items-center p-3 rounded-lg hover:bg-base-200 transition-colors">
                        <Settings className="size-5" />
                        <span className="ml-3 font-medium">Settings</span>
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full flex items-center p-3 rounded-lg hover:bg-error/10 text-error transition-colors"
                      >
                        <LogOut className="size-5" />
                        <span className="ml-3 font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar - Only visible on small screens */}
      {/* Overlay with fade in/out animation */}
      <div
        className={`fixed inset-0 bg-base-300/70 backdrop-blur-sm z-40 sm:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar panel with slide animation */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-base-100 border-r border-base-300 shadow-lg z-50 sm:hidden flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header with close button */}
        <div className="p-4 border-b border-base-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={document.getElementById("data-theme")?.getAttribute("data-theme") === "dark" ? "/App.svg" : "/Logo.svg"}
              alt="Logo"
              className="size-8"
            />
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sr-Jr</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-base-200 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* User profile section */}
        {authUser && (
          <div className="p-4 border-b border-base-300 flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={authUser.profilePicture || "/avatar.png"} alt="User" />
              </div>
            </div>

            <div className="overflow-hidden">
              <p className="font-semibold truncate">{authUser.fullName}</p>
              <span className="text-xs text-base-content/70 truncate">
                {authUser.role || "Developer"}
              </span>
            </div>
          </div>
        )}

        {/* Navigation links with staggered animation */}
        {authUser &&
          (
            <nav className="flex-1 overflow-y-auto py-4 px-2">
              <ul className="menu gap-1.5">
                {menuItems.map((item, index) => (
                  <li
                    key={item.path}
                    className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                    style={{ transitionDelay: `${50 * index}ms` }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center h-10 px-3 rounded-lg transition-colors ${isActive(item.path)}`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )
        }
        {/* Bottom section with fade in animation */}
        <div
          className={`p-4 border-t border-base-300 transition-all duration-300 ${sidebarOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          style={{ transitionDelay: "300ms" }}
        >
          <Link
            to="/settings"
            className={`flex items-center h-10 px-3 rounded-lg transition-colors ${isActive("/settings")}`}
          >
            <Settings className="size-5" />
            <span className="ml-3">Settings</span>
          </Link>

          {authUser && (
            <Link
              to="/profile"
              className="flex items-center h-10 px-3 rounded-lg transition-colors hover:bg-base-200 w-full mt-2"
            >
              <User className="size-5" />
              <span className="ml-3">Profile</span>
            </Link>
          )}

          {authUser && (
            <button
              onClick={() => logout()}
              className="flex items-center h-10 px-3 rounded-lg transition-colors hover:bg-base-200 w-full mt-2 text-error"
            >
              <LogOut className="size-5" />
              <span className="ml-3">Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* Spacer to prevent content from hiding under the navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;