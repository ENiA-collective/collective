import UploadWidget from "../components/buttons/UploadWidget";

const ListingForm = ({ handleSubmit, formData, setFormData }) => {
  
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = secure_url => {
    setFormData(prevData => ({
      ...prevData,
      image_src: secure_url,
    }));
  };

  return (
    <div className="form-wrapper bg-background overflow-hidden rounded-2xl text-text max-w-screen-sm">
      <form onSubmit={handleSubmit} className="flex flex-col p-8 gap-4 text-center">
        <div className="form-container flex-col flex">
          <label htmlFor="title" className="sr-only">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Title"
            className="input "
            maxLength={50}
          />
        </div>

        <div className="form-container flex-col flex">
          <label htmlFor="description" className="sr-only">Item Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Item Description"
            className="input textarea"
            rows="4" 
            maxLength={250}
          />
        </div>

        <div className="form-container">
          <label htmlFor="item-image" className="block text-sm font-medium text-text"></label>
          <UploadWidget id="item-image" onUpload={handleImageUpload} />
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

export default ListingForm;
