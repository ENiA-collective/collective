/*import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';

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
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/my-profile' element={<UserPage />} />
      </Routes>
    </main>
  </>;
} 

^ Old code */


import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import UserPage from './pages/User';
import EditUserPage from './pages/EditUser';
import PostForm from './pages/PostForm';
import { checkForLoggedInUser } from './adapters/auth-adapter';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const user = await checkForLoggedInUser();
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      }
    }

    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <SiteHeadingAndNav />
      <main>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/users/:id/edit" element={<EditUserPage />} />
          <Route path="/listings/:id" element={<ListingPage />} />
          <Route path="/listings/:id/edit" element={<PostForm currentUser={currentUser} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;

/*

integrated 'checkForLoggedInUser' from auth-adapter.js
used useState and useEffect hooks to manage current user state
edit user page tbd?
routed edit listings to the post form, not totally sure if thats the move

*/
