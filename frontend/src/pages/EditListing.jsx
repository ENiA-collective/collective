import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchListing, updateListing } from '../adapters/listing-adapter';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditListingForm from '../components/EditListingForm';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_src: '',
  });

  const [errorText, setErrorText] = useState('');
  
  useEffect(() => {
    const loadListing = async () => {
      const [listing, error] = await fetchListing(id);
      if (error) return setErrorText(error.message);

      if (listing.user_id !== currentUser.id) {
        navigate('/');
        return;
      }

      setFormData({
        title: listing.title,
        description: listing.description,
        image_src: listing.image_src,
      });
    };

    if (currentUser) {
      loadListing();
    } else {
      navigate('/login');
    }
  }, [id, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [updatedListing, error] = await updateListing(id, formData);
    if (error) {
      setErrorText(error.message);
    } else {
      navigate(`/listings/${id}`);
    }
  };

  if (!currentUser) return <p>Loading...</p>;

  return (
    <>
      <h1>Edit Listing</h1>
      <EditListingForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
      {errorText && <p>{errorText}</p>}
    </>
  );
};

export default EditListing;
