import { createContext, useState, useEffect } from 'react';
import { checkForLoggedInUser } from '../adapters/auth-adapter';

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const [user, error] = await checkForLoggedInUser();
        if (error) {
          console.error("Failed to check for logged in user:", error);
          setCurrentUser(null);
        } else {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error during loadUser:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {loading ? <p>Loading...</p> : children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
