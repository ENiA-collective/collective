import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="sticky top-0 z-50 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-primary text-sm py-4 dark:bg-primary shadow-md">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
        <div className="flex items-center justify-between">
          <a className=" flex-none text-5xl font-semibold dark:text-secondary" href="/">Collective</a>
          <div className="sm:hidden">
            <button
              type="button"
              onClick={toggleNav}
              className="p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-primary text-text shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-primary dark:text-secondary dark:hover:bg-white/10"
              aria-controls="navbar-with-collapse"
              aria-label="Toggle navigation"
            >
              {isNavOpen ? (
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div id="navbar-with-collapse" className={`transition-all duration-300 overflow-hidden basis-full grow sm:block ${isNavOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <NavLink className="text-lg font-medium text-white hover:text-text" to="/">Home</NavLink>
            <NavLink className="text-lg font-medium text-white hover:text-text " to="/about">About</NavLink>
            {currentUser ? (
              <>
                <NavLink className="text-lg font-medium text-white hover:text-text " to="/post">Post</NavLink>
                <NavLink className="text-lg font-medium text-white hover:text-text " to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink>
              </>
            ) : (
              <>
                <NavLink className="text-lg font-medium text-white hover:text-text " to="/login">Login</NavLink>
                <NavLink className="text-lg font-medium text-white hover:text-text " to="/signup">Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

