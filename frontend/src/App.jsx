import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/CurrentUserContext.jsx';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UserPage from './pages/User';
import CreateListing from './pages/CreateListing.jsx'
import EditListing from './pages/EditListing.jsx';
import About from './pages/About.jsx';
import EditAccount from './pages/EditAccount.jsx';
import Listing from './pages/Listing.jsx'

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return <>
    <SiteHeadingAndNav />
    <main>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/users/:id/edit' element={<EditAccount />} />
        <Route path='/post' element={<CreateListing />} />
        <Route path='/listings/:id' element={ <Listing /> } /> 
        <Route path='/listings/:id/edit' element={<EditListing />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
  </>
};