import { deleteListing } from "../../adapters/listing-adapter";
import { useNavigate } from "react-router-dom";

const DeleteListing = ({ listingId, setErrorText }) => {
  const navigate = useNavigate()

  const handleClick = async () => {
    const [res, error] = await deleteListing(listingId)
    if (error) setErrorText(error.message)
    navigate(-1)
  }

  return <button type="button" onClick={handleClick}>Delete</button>
}

export default DeleteListing;