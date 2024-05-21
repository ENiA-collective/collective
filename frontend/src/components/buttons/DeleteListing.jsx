import { deleteListing } from "../../adapters/listing-adapter";
import { useNavigate } from "react-router-dom";

const DeleteListing = ({ listingId, setErrorText }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const [res, error] = await deleteListing(listingId);
    if (error) return setErrorText(error.message);
    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-white text-black rounded-full font-semibold text-lg px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[2px_5px_0_0_black] active:translate-y-0.5 active:translate-x-0.25 active:shadow-none"
    >
      Delete
    </button>
  );
};

export default DeleteListing;