import UploadWidget from "../components/buttons/UploadWidget";

const AccountForm = ({ handleSubmit, formData, setFormData, newUser }) => {

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = secure_url => {
    setFormData(prevData => ({
      ...prevData,
      pfp_src: secure_url,
    }));
  };

  return (
    <div className="form-wrapper max-w-lg bg-background overflow-hidden rounded-2xl text-text">
      <form
        onSubmit={handleSubmit}
        aria-labelledby="form-heading"
        className="flex flex-col p-8 gap-4 text-center min-w-full items-center"
      >
        <h1 id="form-heading" className="font-bold text-2xl">{newUser ? 'Create' : 'Edit'} Account</h1>
      
        <div className="form-container">
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            autoComplete="off"
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
          <label htmlFor="display-name" className="sr-only">Display Name</label>
          <input
            autoComplete="off"
            type="text"
            id="display-name"
            name="display_name"
            onChange={handleChange}
            value={formData.display_name}
            placeholder="Display Name"
            className="input"
            maxLength={50}
          />
        </div>
      
        <div className="form-container">
          <label htmlFor="pronouns" className="sr-only">Pronouns</label>
          <input
            autoComplete="off"
            type="text"
            id="pronouns"
            name="pronouns"
            onChange={handleChange}
            value={formData.pronouns}
            placeholder="Pronouns"
            className="input"
            maxLength={50}
          />
        </div>

        { !newUser && <>
        <label htmlFor='bio'>Bio</label>
        <textarea
          id='bio'
          onChange={handleChange}
          name='bio'
          value={formData.bio}
          maxLength={250}
          rows="4" />
          
        </>
      }

        <div className="form-container">
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            autoComplete="off"
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

        <div className="form-container">
          <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
          <input
            autoComplete="off"
            type="password"
            id="confirm-password"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
            placeholder="Confirm Password"
            className="input"
            maxLength={50}
          />
        </div>

        <div className="form-container">
          <label htmlFor="profile-picture" className="block text-sm font-medium text-text">Profile Picture:</label>
          <UploadWidget id="profile-picture" onUpload={handleImageUpload} />
        </div>

        <button
          type="submit"
          className="bg-secondary text-text rounded-full font-semibold text-lg px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[2px_5px_0_0_black] active:translate-y-0.5 active:translate-x-0.25 active:shadow-none"
        >
          Submit
          </button>
        
      </form>
    </div>
  );
};

export default AccountForm;