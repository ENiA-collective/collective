import React from 'react';

const EditProfileForm = ({ handleSubmit, formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="display_name">Display Name</label>
        <input
          type="text"
          id="display_name"
          name="display_name"
          value={formData.display_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="pronouns">Pronouns</label>
        <input
          type="text"
          id="pronouns"
          name="pronouns"
          value={formData.pronouns}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditProfileForm;
