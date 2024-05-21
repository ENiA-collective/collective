import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return <header>
    <a id='logo' href='/'>Collective</a>
    <nav>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>

        {
          currentUser
            ? <>
              <li><NavLink to='/post'>Post</NavLink></li>
              {/* <li><NavLink to='/users' end={true}>Users</NavLink></li> we don't have a frontend page that shows all users*/}
              <li><NavLink to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
            </>
            : <>
              <li><NavLink to='/login'>Login</NavLink></li>
              <li><NavLink to='/signup'>Sign Up</NavLink></li>
              {/* removed My Profile link because it's only visible to users who aren't logged in. Aka users with no profile*/}
            </>
        }
      </ul>
    </nav>
  </header>;
}