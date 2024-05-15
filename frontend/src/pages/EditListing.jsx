import React, { useState, useEffect, useContext } from "react"
import ListingForm from "../components/ListingForm"
import CurrentUserContext from "../contexts/CurrentUserContext"
import { createListing } from "../adapters/listing-adapter"
import { useNavigate } from "react-router-dom"

const EditListing = () => {
	const navigate = useNavigate()
  //TODO: REFACTOR so that this is meant for EDITING and not creating a new resource
  // hopefully someone made a ticket for this!
	const { currentUser } = useContext(CurrentUserContext)
	const [errorText, setErrorText] = useState("")
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image_src: "",
		latitude: "",
		longitude: "",
		user_id: currentUser.id,
  })
  
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setFormData(prevData => ({
						...prevData,
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					}))
				},
				error => {
					setErrorText("Error getting user location:", error)
				}
			)
		} else {
			setErrorText("Geolocation not supported by browser")
		}
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()

		const { title, description, image_src } = formData

		if (!title) return setErrorText("Missing title")
		if (!description) return setErrorText("Missing description")
		if (!image_src) return setErrorText("Please upload an image")

		const [listing, error] = await createListing(formData)
		if (error) return setErrorText(error.message)

		navigate(-1)// go back to previous page instead of home every single time
	}

	//todo: make the words log in/ sign up links
	if (!currentUser) return <p>Please log in or sign up to be able to post.</p>

	return (
		<> {/*Replaced div with fragment as there's only two or 3 components here that do not
    need to be grouped together for styling*/}
			<h1>List an Item</h1>
      <ListingForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
      {errorText && <p>{errorText}</p>}
		</>
	)
}

export default EditListing
