import React, { useState, useEffect, useContext } from "react"
import ListingForm from "../components/ListingForm"
import CurrentUserContext from "../contexts/CurrentUserContext"
import { fetchListing, updateListing } from "../adapters/listing-adapter"
import { useNavigate, useParams } from "react-router-dom"

const EditListing = () => {
	const navigate = useNavigate();
	 //TODO: REFACTOR so that this is meant for EDITING and not creating a new resource
  // hopefully someone made a ticket for this!
	const { id } = useParams();
	const { currentUser } = useContext(CurrentUserContext);
	const [errorText, setErrorText] = useState("");
	const [formData, setFormData] = useState({
	  title: "",
	  description: "",
	  image_src: "",
	});
  // Fetch th elisting data on mount
	useEffect(() => {
		const getListing = async () => {
		  try {
			const [listing, error] = await fetchListing(id);
			if (error) {
			  setErrorText(error.message);
			  return;
			}
			setFormData({
			  title: listing.title,
			  description: listing.description,
			  image_src: listing.image_src,
			});
		  } catch (error) {
			setErrorText("Error fetching listing data.");
		  }
		};
	
		getListing();
	  }, [id]);
	// Handle form submission
	  const handleSubmit = async (e) => {
		e.preventDefault();
	
		const { title, description, image_src } = formData;

	     // Validate form data
		if (!title) return setErrorText("Missing title");
		if (!description) return setErrorText("Missing description");
		if (!image_src) return setErrorText("Please upload an image");
	
	    // Update listing
		const [updatedListing, error] = await updateListing(id, formData);
		if (error) return setErrorText(error.message);
	     
		// Navigate back to the listing page
		navigate(`/listings/${id}`);
	  };
	
	  // Show a message if the user is not logged in
      // todo: make the words log in/ sign up links
	  if (!currentUser) return <p>Please log in or sign up to be able to edit the listing.</p>;
	
	  return (
		<>
		  <h1>Edit Listing</h1>
		  <ListingForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
		  {errorText && <p>{errorText}</p>}
		</>
	  );
	};
	
	export default EditListing;