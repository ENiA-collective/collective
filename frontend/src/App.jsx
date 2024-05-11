import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/CurrentUserContext.jsx';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import PostForm from './pages/PostForm';

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return <>
    <SiteHeadingAndNav />
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        {/* <Route path='/users' element={<UsersPage />} /> we don't have a frontend route that lists all users, this page never gets used and renders the same component as /users/:id*/}
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/post' element={<PostForm /> } />
        <Route path='*' element={<NotFoundPage />} />
        {/* <Route path='/my-profile' element={<UserPage />} /> this route never gets used and renders the same component as /users/:id */}
      </Routes>
    </main>
  </>;
}
