import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const [user, error] = await logUserIn(formData);
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="form-wrapper max-w-xs bg-white overflow-hidden rounded-2xl text-text shadow-lg">
        <form
          onSubmit={handleSubmit}
          aria-labelledby="form-heading"
          className="flex flex-col p-8 gap-4 text-center"
        >
          <h2 id="form-heading" className="font-bold text-2xl">Login</h2>
          <div className="form-container">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              autoComplete="username"
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              required
              placeholder="Username"
              className="input"
              maxLength={50}
            />
          </div>
          <div className="form-container">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              autoComplete="current-password"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              placeholder="Password"
              className="input"
              maxLength={50}
            />
          </div>
          <button
            type="submit"
            className="bg-secondary text-text rounded-full font-semibold text-lg px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[2px_5px_0_0_black] active:translate-y-0.5 active:translate-x-0.25 active:shadow-none"
          >
            Login
          </button>
        </form>
        {errorText && <p className="text-sm text-red-600 mt-2">{errorText}</p>}
        <p className="mt-6 text-sm text-center text-text">
          Don't have an account with us? <Link to={'/signup'} className="text-primary hover:underline">Sign Up!</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
