import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListing } from "../adapters/listing-adapter";
import { getUser } from "../adapters/user-adapter";
import CurrentUserContext from "../contexts/CurrentUserContext";
import UserLink from '../components/buttons/UserLink';
import DeleteListing from "../components/buttons/DeleteListing";
import RequestItem from "../components/buttons/RequestItem";
import { readableDate } from "../utils";

const Listing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [listing, setListing] = useState({});
  const [originalPoster, setOriginalPoster] = useState({username: ''});

  useEffect(() => {
    const loadListing = async () => {
      const [currentListing, error] = await getListing(id);
      if (error) return setErrorText(error.message);
      setListing(currentListing);
    };
    loadListing();
  }, [id]);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(listing.user_id);
      if (error) return setErrorText(error.message);
      setOriginalPoster(user);
    };
    if (listing.user_id) {
      loadUser();
    }
  }, [listing]);

  const handleEdit = () => {
    navigate(`/listings/${id}/edit`);
  };

  const userObj = currentUser ?? { id: 0 };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
        <img src={listing.image_src} alt={listing.title} className="w-full h-auto rounded mb-4" />
        <p className="text-gray-600 mb-2">Posted on: {readableDate(listing.created_at)}</p>
        <div className="flex items-center mb-4">
          <img src={originalPoster.pfp_src} alt={originalPoster.username} className="w-12 h-12 rounded-full mr-4" />
          <p>Posted by: <UserLink user={originalPoster} /></p>
        </div>
        <p className="text-gray-700 mb-4">{listing.description}</p>
        {errorText && <p className="text-red-600 mb-4">{errorText}</p>}
        <div className="flex space-x-4">
          {userObj.id === originalPoster.id ? (
            <>
              <button type="button" onClick={() => navigate(`/orders/my-gifts`)} className="button-primary">
                View Orders - {listing.order_count} Request(s) made!
              </button>
              <button type="button" onClick={handleEdit} className="button-primary">
                Edit Listing
              </button>
              <DeleteListing listingId={listing.id} setErrorText={setErrorText} />
            </>
          ) : (
            <RequestItem listing={listing} setErrorText={setErrorText} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;

// should render amount of requests and redirect to order screen if the user owns the listing