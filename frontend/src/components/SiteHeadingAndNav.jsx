import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-primary text-sm py-4 dark:bg-primary">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
        <div className="flex items-center justify-between">
          <a className="flex-none text-xl font-semibold dark:text-secondary" href="/">Collective</a>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-primary text-text shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-primary dark:text-secondary dark:hover:bg-white/10"
              data-hs-collapse="#navbar-with-collapse"
              aria-controls="navbar-with-collapse"
              aria-label="Toggle navigation"
            >
              <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div id="navbar-with-collapse" className="hidden transition-all duration-[0.1ms] overflow-hidden basis-full grow sm:block">
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <NavLink className="font-medium text-secondary" to="/">Home</NavLink>
            <NavLink className="font-medium text-secondary hover:text-primary dark:text-secondary dark:hover:text-primary" to="/about">About</NavLink>
            {currentUser ? (
              <>
                <NavLink className="font-medium text-secondary hover:text-primary dark:text-secondary dark:hover:text-primary" to="/post">Post</NavLink>
                <NavLink className="font-medium text-secondary hover:text-primary dark:text-secondary dark:hover:text-primary" to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink>
              </>
            ) : (
              <>
                <NavLink className="font-medium text-secondary hover:text-primary dark:text-secondary dark:hover:text-primary" to="/login">Login</NavLink>
                <NavLink className="font-medium text-secondary hover:text-primary dark:text-secondary dark:hover:text-primary" to="/signup">Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
